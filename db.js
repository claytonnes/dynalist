import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Db{
    constructor(){
        this.listsKey = "65f085fa-b6f3-4827-987e-742f0b89ec42";
        this.storesKey = "802c22f5-e6e6-488c-8e07-43e8978027ed";
        this.productsKey = "954cff23-b4b5-4197-bd1b-1b90f0d898ba";
        // this.lists.set('randomId', 
        // [
        //     {
        //         id: '0',
        //         product: 'potatoes',
        //         checked: false,
        //     },
        //     {
        //         id: '1',
        //         product: 'totatoes',
        //         checked: false,
        //     },
        //     {
        //         id: '2',
        //         product: 'botatoes',
        //         checked: false,
        //     },
        // ])
        // this.stores = [];
    }

    
    storeData = async (key, value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem(key, jsonValue)
        } catch (e) {
          console.log('Error writing to storage');
        }
    }
 
    getData = async (key) => {
        try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch(e) {
            console.log('Error reading from storage');
        }
    }

    async setList(id, list){
        let l = await this.getData(this.listsKey);  
        if(l == null || Object.entries(l).length == 0){
            l = [];
            // l = new Map();
        }
        l.push({id: id, list: list});
        await this.storeData(this.listsKey, l);
    }

    async getList(id){
        const l = await this.getData(this.listsKey);
        let item = l.find((item) => item.id == id);
        if(item == null){
            item = [];
        }
        return item;
    }

    async getAllLists(){
        let lists = await this.getData(this.listsKey);
        if(lists == null || Object.entries(lists).length == 0){
            return [
                {
                    id: 1,
                    name: "lista",
                    store: "Ica hörnan",
                    date: '21/7-2020'
                },
                {
                    id: 2,
                    name: "lista",
                    store: "Ica hörnan",
                    date: '21/7-2020'
                },
                {
                    id: 3,
                    name: "lista",
                    store: "Ica hörnan",
                    date: '21/7-2020'
                },
                {
                    id: 4,
                    name: "lista",
                    store: "Ica hörnan",
                    date: '21/7-2020'
                },
                {
                    id: 5,
                    name: "lista",
                    store: "Ica hörnan",
                    date: '21/7-2020'
                },
                {
                    id: 6,
                    name: "lista",
                    store: "Ica hörnan",
                    date: '21/7-2020'
                },
                {
                    id: 7,
                    name: "lista",
                    store: "Ica hörnan",
                    date: '21/7-2020'
                },   
            ];
        }
        else return lists;
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