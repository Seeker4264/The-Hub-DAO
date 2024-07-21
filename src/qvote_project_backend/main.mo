import Principal "mo:base/Principal";
import Buffer "mo:base/Buffer";
import HashMap "mo:base/HashMap";
import Result "mo:base/Result";
import Iter "mo:base/Iter";
import Option "mo:base/Option";
import Array "mo:base/Array";
import Text "mo:base/Text";
import Types "daoTemp.types";
import daoTemplate "daoTemp";

actor {

    type Member = Types.Member;
    type indDao = daoTemplate.DAO;

    let daoList = Buffer.Buffer<indDao>(5);

    // Classes

    class ParsedDAO(dName : Text, dManifesto : Text) = {
        public let name = dName;
        public let manifesto = dManifesto;
    };

    // Create DAO

    public func createDao(daoName : Text, daoManifesto : Text) : async () {
        let dao : indDao = await daoTemplate.DAO(daoName, daoManifesto);
        daoList.add(dao);
        return;
    };

    // Get methods for DAOs

    public shared query func getDaos() : async [indDao] {
        return Buffer.toArray(daoList);
    };

    public shared func getDaoNameByInd(i : Nat) : async Text {
        let dao = daoList.get(i);
        return await dao.getName();
    };

    public shared func getDaoByName(name : Text) : async ?indDao {
        for (i in Iter.range(0, daoList.size() - 1)) {
            let dao = daoList.get(i);
            let naming = await dao.getName();
            if (naming == name) {
                return ?dao;
            };
        };

        return null;
    };

    public shared func getDaosNames() : async [Text] {
        let listing = Buffer.Buffer<Text>(5);

        for(i in Iter.range(0, daoList.size() - 1)) {
            let dao = daoList.get(i);
            let naming = await dao.getName();
            listing.add(naming);
        };

        return Buffer.toArray(listing);
    };

    public shared func getDaosManifestos() : async [Text] {
        let listing = Buffer.Buffer<Text>(5);

        for(i in Iter.range(0, daoList.size() - 1)) {
            let dao = daoList.get(i);
            let manifest = await dao.getManifesto();
            listing.add(manifest);
        };

        return Buffer.toArray(listing);
    };

    public shared func getSearchDaos() : async [ParsedDAO] {
        let listing = Buffer.Buffer<ParsedDAO>(5);

        for(i in Iter.range(0, daoList.size() - 1)) {
            let dao = daoList.get(i);
            let naming = await dao.getName();
            let manifest = await dao.getManifesto();
            let parsedDao = ParsedDAO(naming, manifest);
            listing.add(parsedDao);
        };

        return Buffer.toArray(listing);
    };

    // DAO specific

    public func addMemberToDao(newMember : Member, daoName : Text) : async () {
        
    };

    // Unrelated functions

    public query func greet(name : Text) : async Text {
        return "Hello, " # name # "!";
    };

    public shared query ({caller}) func greet2(name : Text) : async Text {
        return "Hello, " # name # "! " # "Your PrincipalId is: " # Principal.toText(caller);
    };

    /*
        DEV NOTES (spanish):

        Ejecuté las funciones de este archivo Motoko en el playground. 
        Aparentemente la clase "DAO" sí funciona sin problemas cuando 
        ejecuto la función de crear un dao. Eso me da a entender de que tanto
        "daoTemp.mo" como "daoTemp.types.mo" funcionan igualmente si las 
        importo acá.

        Tuve que hacer deploy a los canisters en el playground, ya que en local 
        no me permite usar las funciones que crean canisters por no tener ciclos; 
        ésto fue lo que me dió a entender de que la clase "DAO", al crear una variable 
        con el type "indDao", está creando un canister nuevo, lo cual está bien por el 
        momento.

        Durante la ejecución, no hubo ningún error. Al crear el DAO, me mostraba el 
        nombre de la función, junto con los parámetros que le pasé. A la hora de ejecutar 
        la función que devuelve el Buffer con los canisters/DAOs creados, me devuelve el 
        id de cada uno, en lugar de la info completa de cada uno. Aún así, me parece que 
        va por una dirección correcta.

        Para que me muestre la info de cada uno, tengo pensado iterar sobre cada index del 
        Buffer y ejecutar una función que entregue cada atributo. Podría usar el import del 
        "Iter", o mapear el Buffer cuando sea un Array. Luego veré otras alternativas, pero 
        por ahora tengo esas dos, y espero que funcionen.
    */

};
