import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export default class GenerateProducts{
    constructor(){
        this.dairy ='Mjölk,Fil,Yoghurt,Kvarg,Keso,Smör,Grädde,Crème fraiche,Gräddfil,Kvarg,Smetana,Matlagninggrädde,Kefir';
        this.meat = 'Falukorv,Chorizo,Fläskfilé,Flästytterfilé,Fläskkotlett,Ryggbiff, Nötfärs, Blandfärs, Fläskfärs, Entrecôte, Flankstek, Revben, Ribs, Lövbiff, Lammkorv, Lammfilé, Kycklingfilé, Kycklinglår, Kycklingben, Kyclklinglårfilé, Kycklingfärs, Pulled Pork, Pulled Chicken, Pulled Beef, Oxfilé';
        this.vegetables = 'Gul lök,Röd lök,Vitlök,Silverlök,Steklök,Schalottenlök,Fast potatis,Mölig potatis,Färskpotatis,Morötter,Palsternacka,Gulbetor,Rödbetor,Jordärtskocka,Kålrot,Blomkål,Kålrabbi,Rotselleri,Bladselleri,Stjälkselleri,Isberssallad,Romansallat,Cosmopolitansallat,Ruccola,Bladspenat,Salladsmix,Mâchesallad,Tomater,Babyplommontomater,Körsbärstomater,Romanticatomater,Gurka,Vitkål,Rödkål,Grön sparris,Vit sparris,Aubergine,Zucchini,Squash,Färsk majskolv,Rädisor,Salladslök,Broccoli,Purjolök,Spetspaprika,Röd paprika,Gul paprika,Sockerärtor,Sugar snaps';
    }
    generateDairyProducts(){
        let arr = [];
        this.dairy.split(',').forEach((word) => {
            arr.push(
                {
                    id: uuidv4(),
                    name: word,
                    cId: '1'
                }
            )
        })
        return arr;
    }
    
    generateMeatProducts(){
        let arr = [];
        this.meat.split(',').forEach((word) => {
            arr.push(
                {
                    id: uuidv4(),
                    name: word,
                    cId: '4'
                }
            )
        })
        return arr;
    }
    generateVegetableProducts(){
        let arr = [];
        this.vegetables.split(',').forEach((word) => {
            arr.push(
                {
                    key: uuidv4(),
                    name: word,
                    cId: '0'
                }
            )
        })
        return arr;
    }
}