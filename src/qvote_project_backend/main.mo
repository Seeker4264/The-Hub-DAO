import Principal "mo:base/Principal";
import Buffer "mo:base/Buffer";
import HashMap "mo:base/HashMap";
import Result "mo:base/Result";
import Iter "mo:base/Iter";
import Option "mo:base/Option";
import Array "mo:base/Array";
import Text "mo:base/Text";
import Cycles "mo:base/ExperimentalCycles";

import Types "daoTemp.types";
import daoTemplate "daoTemp";

actor {

    type Result<Ok, Err> = Types.Result<Ok, Err>;

    type Member = Types.Member;
    type indDao = daoTemplate.DAO;

    stable var daoList_store : [indDao] = [];
    let daoList = Buffer.Buffer<indDao>(5);

    // Classes

    class ParsedDAO(dName : Text, dManifesto : Text) = {
        public let name = dName;
        public let manifesto = dManifesto;
    };

    // Create DAO

    public func createDao(daoName : Text, daoManifesto : Text) : async () {

        Cycles.add<system>(250000000000); // Pass cycles for the Dao creation

        let dao : indDao = await daoTemplate.DAO(daoName, daoManifesto);
        daoList.add(dao);
        return;
    };

    // Delete DAO

    public func deleteDao(daoName : Text) : async Result<Text, Text> {     
        for (i in Iter.range(0, daoList.size() - 1)) {
            let dao = daoList.get(i);
            let naming = await dao.getName();
            if (naming == daoName) {
                let x = daoList.remove(i);
                return #ok("DAO deleted successfully");
            };
        };

        return #err("DAO doesn't exist");
    };

    public func resetBuffer() : async () {
        daoList.clear();
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

    public shared func getDaoInX(name : Text) : async ?Nat {
        for (i in Iter.range(0, daoList.size() - 1)) {
            let dao = daoList.get(i);
            let naming = await dao.getName();
            if (naming == name) {
                return ?i;
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

    public func getDaoManifesto(daoName : Text) : async Result<Text, Text> {
        let dao = await getDaoByName(daoName);
        
        switch (dao) {
            case (null) {
                return #err("DAO doesn't exist");
            };
            case (?indDao) {
                return #ok(await indDao.getManifesto());
            };
        };
    };

    public func setDaoManifesto(daoName : Text, newManifesto : Text) : async Result<(), Text> {
        let dao = await getDaoByName(daoName);
        
        switch (dao) {
            case (null) {
                return #err("DAO doesn't exist");
            };
            case (?indDao) {
                return #ok(await indDao.setManifesto(newManifesto));
            };
        };
    };

    public func daoCyclesBalance(daoName : Text) : async Result<Nat, Text> {
        let dao = await getDaoByName(daoName);

        switch (dao) {
            case (null) {
                return #err("DAO doesn't exist");
            };
            case (?indDao) {
                return #ok(await indDao.daoBalance());
            };
        };
    };

    // Unrelated functions

    public query func mainDaoBalance() : async Nat {
        return Cycles.balance();
    };

    // Custom stable memory functions

    system func preupgrade() {
        daoList_store := Iter.toArray(daoList.vals());
    };

    system func postupgrade() {
        daoList_store := [];
    };
};
