// [ 1. CONSULTA ]
// · Muestrame el importe total de facturación
// de las ventas a Apple

db.ventas.aggregate([

    {$match: {Empresa: "Apple"}},
    {$group: { _id: "$Empresa" , totalFacturado: { $sum: { $multiply: [ "$PrecioPublico", "$CantidadVendidas" ]}}}}

]);


// [ SOLUCION ]

// { "_id" : "Apple", "totalFacturado" : 580000 }




// [ 2. CONSULTA ]
// · Quiero que me enseñes un ranking con las empresas 
// y su mayor compra en cuanto a cantidad. 

db.ventas.aggregate([
    
    {$group: { _id: "$Empresa" , cantidad: { $max: "$CantidadVendidas"  }  }  },
    {$sort: { cantidad: -1}}
]);


// [ SOLUCION ]
/*
{ "_id" : "LG", "cantidad" : 750 }
{ "_id" : "Xiaomi", "cantidad" : 650 }
{ "_id" : "Apple", "cantidad" : 500 }
{ "_id" : "Samsung", "cantidad" : 340 }
{ "_id" : "Huawei", "cantidad" : 300 }
{ "_id" : "Honor", "cantidad" : 290 }
*/




// [ 3. CONSULTA ]
// · Muestrame cuanto se gastan las empresas de media 
// en crear sus productos.

db.ventas.aggregate([

    {$group: {_id: "$Empresa" , AvgMake: {$avg: "$CosteFabrica"}}},
    {$sort: {AvgMake: -1}}
]);


// [ SOLUCION ]
/*
{ "_id" : "Samsung", "AvgMake" : 475 }
{ "_id" : "Huawei", "AvgMake" : 250 }
{ "_id" : "Apple", "AvgMake" : 225 }
{ "_id" : "LG", "AvgMake" : 225 }
{ "_id" : "Xiaomi", "AvgMake" : 145 }
{ "_id" : "Honor", "AvgMake" : 90 }
*/




// [ 4. CONSULTA ]
// · Enseñame las fechas en las que se hicieron pedidos

db.ventas.aggregate([
    
    {$group: { _id: { Año: {$year: "$Fecha"} , Mes: {$month: "$Fecha"}}}},
    {$sort:{_id: -1}}
]);

// [ SOLUCION ]
/*
{ "_id" : { "Año" : 2020, "Mes" : 5 } }
{ "_id" : { "Año" : 2019, "Mes" : 10 } }
{ "_id" : { "Año" : 2019, "Mes" : 8 } }
{ "_id" : { "Año" : 2019, "Mes" : 2 } }
{ "_id" : { "Año" : 2017, "Mes" : 12 } }
{ "_id" : { "Año" : 2016, "Mes" : 3 } }
*/