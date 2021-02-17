//TEMPORARY FOR TEST DATA

const c = [
    {
        key: `0`,
        category: 'Frukt och grönt'
    },
    {
        key: `5`,
        category: 'Bröd'
    },
    {
        key: `2`,
        category: 'Ost'
    },
    {
        key: `3`,
        category: 'Chark'
    },
    {
        key: `4`,
        category: 'Kött'
    },
    {
        key: `6`,
        category: 'Färsk vego'
    },
    {
        key: `16`,
        category: 'Färdigmat'
    },
    {
        key: `1`,
        category: 'Mejeri'
    },
    {
        key: `12`,
        category: 'Hyllprodukter'
    },
    {
        key: `11`,
        category: 'Bakning'
    },
    {
        key: `7`,
        category: 'Hygien'
    },
    {
        key: `14`,
        category: 'Djurprodukter'
    },
    {
        key: `13`,
        category: 'Städ'
    },
    {
        key: `15`,
        category: 'Frys'
    },
    {
        key: `8`,
        category: 'Läsk'
    },
    {
        key: `10`,
        category: 'Chips'
    },
    {
        key: `9`,
        category: 'Godis'
    },
]

export default function categories(){
    return {id: 'default', name: 'default', order: c};
}
