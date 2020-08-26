# React Map

## 웹 사이트
https://reactmap-jh.netlify.com/

## 프로젝트 설명
### 기능
1. 지도에 다른 사람들에게 추천하고 싶은 장소를 클릭하여 핀을 생성할 수 있습니다. 좌표만 정확 하다면 전 세계 어디든 장소를 공유할 수 있습니다.
2. 다른 사람이 생성한 핀을 클릭하여 장소의 사진 및 설명 등을 볼 수 있습니다. 댓글도 많이 달아주세요.
3. 프로필도 꾸며보세요.

### 웹 사이트 내부
로그인   
<img src="https://user-images.githubusercontent.com/53867397/91306472-800cb700-e7e7-11ea-8325-0f480eac50f8.PNG" width="800px" />   
로그인 화면입니다. 아이디와 비밀번호를 입력하시면 들어가실 수 있습니다.   
   
   
회원가입   
<img src="https://user-images.githubusercontent.com/53867397/91306944-42f4f480-e7e8-11ea-9230-1fd8e827c257.PNG" width="800px" />   
회원가입 화면입니다. 서비스에서 사용될 이름, 이메일, 그리고 비밀번호를 알맞게 입력하셨다면 바로 로그인이 됩니다.
   
   
메인   
<img src="https://user-images.githubusercontent.com/53867397/91307862-771ce500-e7e9-11ea-93b7-72b77b1bfaa6.PNG" width="800px" />   
메인 화면입니다. react-map-gl 라이브러리를 사용하여 지도를 가져왔습니다. 우측 상단에 버튼을 클릭하여 프로필을 보고 로그아웃을 할 수 있습니다.
중앙에 보시면 파란핀 2개가 보입니다.   
   
   
핀 생성하기   
<img src="https://user-images.githubusercontent.com/53867397/91308225-eeeb0f80-e7e9-11ea-8bfd-a70707ffd189.PNG" width="800px" />   
지도에서 원하시는 장소를 클릭하시면 핀 생성하기가 가능합니다. 좌표 지점은 보라색 핀으로 가리키고 있고 왼쪽으로 핀 생성에 관한 컨텐츠가 나옵니다.   
   
   
핀 확인   
<img src="https://user-images.githubusercontent.com/53867397/91308510-54d79700-e7ea-11ea-85aa-3fefc43c1beb.PNG" width="800px" />  
핀을 클릭하시면 왼쪽에 장소의 사진과 설명이 나옵니다. 댓글을 작성하실 수 있고 작성자라면 사진을 삭제할 수도 있습니다.   
   
   
프로필   
<img src="https://user-images.githubusercontent.com/53867397/91308701-a6802180-e7ea-11ea-974b-cf717929554a.PNG" width="800px" />  
프로필 수정 화면이 보입니다. 수정하기를 클릭하시면   
<img src="https://user-images.githubusercontent.com/53867397/91308809-c4e61d00-e7ea-11ea-96f7-954dc1a93796.PNG" width="800px" />  
프로필을 수정할 수 있는 화면이 나옵니다.   
   
   
## 프로젝트에 사용된 기술
* Frontend: React Hook을 사용하였고 스타일링은 Styled Components로 하였습니다.   또한 Apollo Client를 사용하여 GraphQL 클라이언트 애플리케이션의 GraphQL과 데이터 교환을 원활하게 하였습니다.
* Backend: Prisma를 사용하였습니다.Prisma의는 Prisma의 서버가 DB 호스트를 앞단에서 관리합니다. 이후 GraphQL 형식의 DataModel을 정의하면 Prisma가 알아서 사용하고있는 DBMS와 언어의 종류에 맞게 실제 DB 배포부터,   클라이언트와 모델 그리고 타입정의까지 자동으로 만들어 제공해 줍니다. 또한 GraphQL의 구현체까지 모두 정의되어 있습니다.
   
   
## 프로젝트 후기
처음으로 웹 배포까지 성공한 저의 첫번째 개인 프로젝트입니다. 사이트를 보시면 미흡한 점이 상당히 많이 보입니다. 로그인 속도도 상당히 느리고 반응형 웹으로 동작하기에도 다소 무리가 있습니다. 하지만 인터넷을 찾아보면서 하나하나 기능을 완성되어 가는 프로젝트를 보면서 저는 정말 뿌듯한 기분을 느꼈습니다. 저는 이렇게 무작정 만들어 실제로 배포까지 해보면서 많은 것을 배울 수 있었습니다. 
