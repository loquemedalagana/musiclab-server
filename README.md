## Musiclab Server V2
- languages: Korean, English, Spanish

## Nest.js 선택한 이유
- 확장성 고려하기
- 정돈되지 않은 express코드에 짜증이 났음.

## folders
1. /auth

2. /mail
   
3. /users

4. /youtube -> 모두 접근 가능
    - channels
    - videos

5. /posts -> 회원만 접근 가능
    
6. /comments -> 댓글 달기

7. /feedbacks -> 답글 달기

8. /tags -> 태그 검색

9. /uploads

10. /notifications

## Database Structure (entity)
musiclab_temp -> musiclab 옮기기

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

## 추가할 기능
- 회원에 한해 영상 다운로드 가능
