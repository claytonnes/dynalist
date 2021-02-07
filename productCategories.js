const c = [
    {
        key: `item-${0}`,
        category: 'Frukt och grönt'
    },
    {
        key: `item-${5}`,
        category: 'Bröd'
    },
    {
        key: `item-${2}`,
        category: 'Ost'
    },
    {
        key: `item-${3}`,
        category: 'Chark'
    },
    {
        key: `item-${4}`,
        category: 'Kött'
    },
    {
        key: `item-${6}`,
        category: 'Färsk vego'
    },
    {
        key: `item-${16}`,
        category: 'Färdigmat'
    },
    {
        key: `item-${1}`,
        category: 'Mejeri'
    },
    {
        key: `item-${12}`,
        category: 'Hyllprodukter'
    },
    {
        key: `item-${11}`,
        category: 'Bakning'
    },
    {
        key: `item-${7}`,
        category: 'Hygien'
    },
    {
        key: `item-${14}`,
        category: 'Djurprodukter'
    },
    {
        key: `item-${13}`,
        category: 'Städ'
    },
    {
        key: `item-${15}`,
        category: 'Frys'
    },
    {
        key: `item-${8}`,
        category: 'Läsk'
    },
    {
        key: `item-${10}`,
        category: 'Chips'
    },
    {
        key: `item-${9}`,
        category: 'Godis'
    },
]

export default function categories(){
    return {id: 'default', name: 'default', order: c};
}
