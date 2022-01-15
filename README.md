# VEGA - ClientApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.1.

## renderizar imagen
Desde el API debe llegar la imagen en base 64 y para mostrarla en el código se debe de colocar 'data:image/png;base64,'+imageBase64
para que el elemento img lo pueda renderizar.

TS:
'data:image/png;base64,' + element.imageFileBase64,
HTML:
<img src="{{p.imageBase64}}" >


