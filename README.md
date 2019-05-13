# Simple pagination of a Javascript collection

A Javascript **class** to provide simple pagination to an array collection with a custom template callback function to render the current pagination page without the need of any external libraries.

##### Usage
Create javascript object based on the Pagination class and pass the require parameters.

```javascript
var p = new Pagination({
    element:"my_table",
    data:array_data,
    pageSize:10,
    template: function(data){
      // Access to current page pagination data
    }
  });      
```

#### Parameters (required)
**element** is the DOM element ID of where the pagination menu is going to be place below of.
**data** is the collection array to be paginated
**pageSize** number of records to show per pagination page
**template** is a callback function exposing the current pagination page data.

#### Parameters (optional)
As an optional parameter you can pass the label contents of the navigation menu.

```javascript
var p = new Pagination({
    element:"my_table",
    data:array_data,
    pageSize:10,
    template: function(data){
      // Access to current page pagination data
    },
    language:{
        showing:
        {
          showing: "Mostrando",
          to: "de",
          of: "de",
          entries: "Entradas"
        },
        navigation:
        {
          first: "Primero",
          previous: "Anterior",
          next: "Siguiente",
          last: "Ultimo"
        },
        show:
        {
          show: "Mostrar",
          entries: "entradas"
        }
    }
  });      
```