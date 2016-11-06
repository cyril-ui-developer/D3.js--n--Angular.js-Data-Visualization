angular.module('MockApiModule',['ngMockE2E'])
 
.run(function ($httpBackend) {
    var products = [{
          "branchId":10001,
        "branchName": "SouthWest Region",
        "performance": 80,
        "year": "2015",
        "month":"April",
           
          "type" :[
        {   
            "id": 100,
            "name": "Canny",
            "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "count": 1800
        },
        {
            "id": 200,
            "name": "Banny",
            "description":"Suspendisse pharetra magna non velit scelerisque condimentum.",
            "count": 3000
        },
        {
            "id": 300,
            "name": "Danny",
            "description":"Donec convallis vel ante eget feugiat. Vestibulum accumsan dolor magna.",
            "count": 2000
        },
        {
            "id":400,
            "name": "Panny",
            "description":"Phasellus sollicitudin ante eu facilisis pharetra. Mauris sodales vitae diam vel consequat.",
            "count": 5000
        },
        {
            "id":500,
            "name": "Manny",
            "description":" Maecenas mauris quam, bibendum a magna non, ornare dignissim sem.",
            "count": 3500
        }
    ],
 
 "sales":[
        {
            "salesdate": "04/02/2015",
            "amount": 300
           
        },
        {
            "salesdate": "04/03/2015",
            "amount": 400
        },
        
        {
            "salesdate": "04/9/2015",
            "amount": 700
        },
        {
            "salesdate": "04/12/2015",
            "amount": 500
        },
        {
            "salesdate": "04/13/2015",
            "amount": 300
        },
        {
            "salesdate": "04/15/2015",
            "amount": 300
        },
       
        {
            "salesdate": "04/20/2015",
            "amount": 350
        },
        {
            "salesdate": "04/21/2015",
            "amount": 560
        },
       
        {
            "salesdate": "04/26/2015",
            "amount": 300
        },
        {
            "salesdate": "04/28/2015",
            "amount": 390
        }
    ]
}];

$httpBackend.whenGET('http://5637ccdf1a271a1100252149.mockapi.io/products').respond(products);
    
    $httpBackend.whenGET(/partials/).passThrough();
     $httpBackend.whenGET(/templates/).passThrough();
})

