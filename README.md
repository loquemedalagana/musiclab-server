## Musiclab Server V2
- languages: Korean, English, Spanish

## Por qué elegí Nest.js?
- para la extensión de la app
- para el código limpio

## folders
1. /auth

2. /mail
   
3. /users
/profiles

4. /youtube -> all
    - channels
    - videos

5. /posts -> solo para miembros
    
6. /comments -> comentarios

7. /feedbacks -> respuestas

8. /tags -> buequeda para tag

9. /uploads

10. /notifications

## Database Structure (entity)

### DTO
[api 주소 정의하기](https://www.codemag.com/Article/1907081/Nest.js-Step-by-Step)
#### 1) api/youtube/channels DTO
1. load-channel (getOne)
2. load-channels (getMany)
3. create-channel (create)
4. update-channel (update)
5. delete-channel (delete)

#### 2) api/youtube/videos DTO
1. load-youtube-video
2. load-youtube-videos
3. create-youtube-video
4. update-youtube-video
5. delete-youtube-video
6. download-youtube-video

#### 3) posts DTO
1. load-post
2. load-posts
3. create-post
4. update-post
5. delete-post

#### 4) feedbacks DTO
1. load-feedback
2. load-feedbacks
3. create-feedback
4. update-feedback
5. delete-feedback

#### 5) comments DTO
1. create-channel
2. update-channel
3. delete-channel

#### 6) tags DTO
