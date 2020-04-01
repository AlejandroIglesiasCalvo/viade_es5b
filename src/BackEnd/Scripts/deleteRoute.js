import {findRouteURL,getSharedRouteFriends} from "./helpers/routeHelper";
import {getRootStorage} from "./helpers/fileHelper";
import {listRoutes} from "./listRoutes";
import { fetchDocument } from 'tripledoc';
import { schema } from 'rdf-namespaces';
import {sendNotificationBody} from "./helpers/notificationHelper";






const auth = require("solid-auth-client");
const FC = require("solid-file-client");
const fc = new FC(auth);

export async function deleteRoute(uuid,routeName) {
    var result=[];
    let session = await auth.currentSession();
    if (!session) {window.location.href = "/login";}
    let storage= await getRootStorage(session.webId);
    let url= await findRouteURL(storage + 'private/routes/',uuid);
    //Si no la encuentro la busco en publico
    if (url===null) 
        url= await findRouteURL(storage + 'public/routes/',uuid);
    //Si la encuentro la borro
    if (url!==null) 
    {
        //Busco a que amigos mandar la circular
        var friends = await getSharedRouteFriends(storage,uuid);
        //quito todas las referencias a la ruta
        await deleteFromSharedRoutes(storage,uuid);
        //mando mensajes de actualizacion de que se elimino la ruta
        for(let i=0;i<friends.length;i++)
        {
            console.log("enviando notificacion borrado a "+friends[i]);
            await sendRouteDeletedNotification(session.webId,friends[i],uuid,routeName)
        }
        //Borro los ficheros asociados a la ruta
        await deleteFilesFromRoute(session.webId,url);
        //Borro el fichero de la ruta
        await fc.delete(url);
        result = await listRoutes();
    }
    return result;
}

async function deleteFromSharedRoutes(storage,routeUUID) {
    const route = 'private/mySharedRoutes.ttl';
    const mySharedRoutesDocument = await fetchDocument(storage + route);
    let rutas = mySharedRoutesDocument.getAllSubjectsOfType('http://arquisoft.github.io/viadeSpec/route');
    for (var e = 0; e < rutas.length; e++) {
        //Donde encuentre esta ruta la elimino
        if(rutas[e].getLiteral(schema.identifier)===routeUUID){
            console.log("borrando comparticion ruta "+routeUUID);
            mySharedRoutesDocument.removeSubject(rutas[e].asRef())}
    }
    await mySharedRoutesDocument.save();
    
}

async function deleteFilesFromRoute(webId,url) {
    const mySharedRoutesDocument = await fetchDocument(url);
    let rutas = mySharedRoutesDocument.getAllSubjectsOfType(schema.MediaObject);
    for (var e = 0; e < rutas.length; e++) {
        //Elimino los ficheros de los que sea dueño
        console.log(rutas[e].getRef(schema.author)+" vs "+webId);
        if(rutas[e].getRef(schema.author)===webId){
            console.log("borrando fichero "+rutas[e].getRef(schema.contentUrl));
            fc.delete(rutas[e].getRef(schema.contentUrl));
        }
    }
}
async function sendRouteDeletedNotification(webId,friendWebId,routeUUID,routeName) {
    return sendNotificationBody(webId,friendWebId,
    `@prefix as: <https://www.w3.org/ns/activitystreams#> .
    @prefix schema: <http://schema.org/> .
    <> a as:Follow ;
    schema:agent <${webId}> ;
    schema:Action "deleteRoute" ;
    schema:comment "${routeName}" ;
    schema:identifier "${routeUUID}" .
    `);
}
