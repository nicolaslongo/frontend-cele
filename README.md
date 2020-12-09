# Frontend-cele

## Set up para correr el Frontend

1. En el directorio del repo, buildeamos con docker-compose:  
```docker-compose build```

2. Corremos el docker-compose y nos conectamos a través del puerto 3001:  
```docker-compose run```

## Opción usando únicamente docker
1. Build del dockerfile
```docker build . -t frontend-cele```

2. Corremos el scrapper
```docker run -d -t -p 40000:3000 --name frontend-cele frontend-cele```
