import axios from "axios";

const instance = axios.create({
    baseURL:'https://api.themoviedb.org/3/',
    headers:{
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwM2FkZTU2ZTNmOThjNjUwYThlMzllMzliYjBmOTg0OSIsIm5iZiI6MTczODkxOTg5Mi4zODEsInN1YiI6IjY3YTVjZmQ0YmYzNjA0MGM1ZDg1ZjBkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pyIOwrCAnhnvnXr1JECQP2-ASaoc2iAwC7KrdWXqTdw'
    }
})

export default instance

