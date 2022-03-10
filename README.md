# VEGA - ClientApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.1.

## renderizar imagen
Desde el API debe llegar la imagen en base 64 y para mostrarla en el código se debe de colocar 'data:image/png;base64,'+imageBase64
para que el elemento img lo pueda renderizar.

TS:
'data:image/png;base64,' + element.imageFileBase64,
HTML:
`<img src="{{p.imageBase64}}"> `


XMLHttpRequest 
Clase de angular que contiene eventos para hacer el tracking a la subida y bajada de archivos.

* onprogress
* upload.onprogress


## Authentication and Authorization.
REVISAR INSTALACIONDE 
We wiil use oAuth0 for API security.

* we need to access in auth0.com --> https://manage.auth0.com/
* add an app in the APIs Menu filling the fields with simple data of th current project.
* In application -> APIs -> Test tab we can find a token to testing.

* install npm install @auth0/angular-jwt
* npm install auth0-lock --save
Se debe de crear un ruta de logout y esa ruta de logout va a ser al que debemos de colocar en Auth0 "Allowed Callbacks URls"

pruebas@pruebas.com
Edg123456*


