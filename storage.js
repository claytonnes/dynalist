import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Storage{
    constructor(){
        //Keys for the different storages I want from async-storage
        this.listsKey = "65f085fa-b6f3-4827-987e-742f0b89ec42";
        this.storesKey = "802c22f5-e6e6-488c-8e07-43e8978027ed";
        this.productsKey = "954cff23-b4b5-4197-bd1b-1b90f0d898ba";
    }

    //Async function for storing data in async storage
    storeData = async (key, value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem(key, jsonValue)
        } catch (e) {
          console.log('Error writing to storage');
        }
    }

    //Async function for getting data from async storage
    getData = async (key) => {
        try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch(e) {
            console.log('Error reading from storage');
        }
    }
    
    //Async function for removing a value in the async storage
    removeValue = async (key) => {
        try {
          await AsyncStorage.removeItem(key)
        } catch(e) {
          // remove error
        }
      }

    
    //Async function for adding or updating a list to the list storage of async-storage
    async setList(id, listName, list){
        let l;

        try{
            l = await this.getData(this.listsKey);
        } catch(e){
            console.log('Error reading data from storage')
        }

        //Detta borde plockas ut till en egen funktion
        if(l == null || Object.entries(l).length == 0){
        l = [];
        } //

        //Checking if list with id exists already
        let specificList = l.find((item) => item.id == id);

        //If not create new list. If list exists, replace with new list object.
        if(!specificList){
            l.push({id: id, name:listName, list: list});
        }
        else{
            l[l.indexOf(specificList)] = {id: id, name:listName, list: list};
        }

        try{
            await this.storeData(this.listsKey, l);
        } catch(e){
            console.log('Error writing data to storage')
        }
    }

     //Async function for getting a specific list given an id 
     //from the list storage of async-storage
    async getList(id){
        try{
            const l = await this.getData(this.listsKey);
            let item = l.find((item) => item.id == id);
            if(item == null){
                item = [];
            }
            return item;
        } catch(e){
            console.log('Error retrieving list from storage');
        }
    }

    //Deletes a specific list given an id
    async deleteList(id){
        let lists;
        try {
            lists = await this.getData(this.listsKey);
        }catch(e){
            console.log("Error retrieving lists from storage")
        }
        const listObject = lists.find(list => list.id == id);
        const index = lists.indexOf(listObject);
        //Finds correct list and splices it from the storage array
        lists.splice(index, 1);
        //Overwrites the old storage array with new, spliced one
        try {
            await this.removeValue(this.listsKey);
            await this.storeData(this.listsKey, lists);
        }catch(e){
            console.log(e);
        }
    }

    //Async function for getting a all lists 
    //from the list storage of async-storage
    async getAllLists(){
        try {
            let lists = await this.getData(this.listsKey);
            if(lists == null || Object.entries(lists).length == 0){
                return [];
            }
            else return lists;
        } catch(e){
            console.log("Error getting lists from storage.")
        }
    }

    setStore(id, name, order){
        let store = this.stores.find((store) => store.id == id);
        if(store==null){
            this.stores.push({
                id: id,
                name: name,
                order: order
            });
        }
        else{
            this.stores[this.stores.indexOf(store)] = 
            {
                id: id,
                name: name,
                order: order
            };
        }
        
    }

    getStore(id){
        return this.stores.find((store) => store.id == id);
    }

    getStores(){
        return this.stores;
    }
}