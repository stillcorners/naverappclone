> 링크를 클릭하면 프로젝트 페이지로 이동합니다.
>
> <aside>
> https://stillcorners.github.io/naverappclone/
>
> </aside>

> 링크를 클릭하면 깃허브 레포지토리로 이동합니다.
>
> <aside>
> https://github.com/stillcorners/naverappclone
>
> </aside>

## 1) 사용한 스택

- `html`, `scss`, `css`

## 2) 프로젝트 상세사항

- [에어비앤비 스타일 가이드](https://github.com/CodeMakeBros/css-style-guide)
- 반응형 디자인 (모바일, PC)
- `flex`와 `grid`를 이용한 요소 배치

## 3) 프로젝트를 통해 배운 점

### 처음 사용해본 에어비앤비 스타일 가이드

언더바를 두 개씩 사용하는 에어비앤비 가이드는 SCSS를 사용할 때에 빛을 발하면서 가독성을 크게 높여주는 장점이 있었습니다.

그로 인해 클래스가 길어지기가 쉬운 점은 언더바를 하나만 사용하는 등 앞으로 잘 맞는 방식을 찾아보려고 합니다.

아쉬웠던 점으로 저는 평소 클래스 이름을 너무 길게 짓는게 고민이였는데, 에어비앤비 가이드를 통해 이 점을 해결하긴 어려웠던 것 같습니다.

다음 프로젝트에서는 좀 더 짧고 효율적으로 클래스를 작성해보고 싶습니다.

### add 할 때에 터미널에서 LF will be replaced by CRLF in 에러

`warning: in the working copy of 'index.html', LF will be replaced by CRLF the next time Git touches it`

add를 할 때에 가끔 터미널에서 위와 같은 LF 관련 에러가 발생했습니다.

LF 관련 에러는 Git이 LF, CRLF 둘 중 어느 쪽을 선택할지 몰라 경고 메세지를 띄워준 것이라고 합니다. 실제로 확인해보니 파일마다 다르게 설정 되어있었습니다.

아래 명령어는 윈도우 OS에서 전역적으로 CRLF에서 LF로 통일해서 바꿔줍니다.

`git config --global core.autocrlf true`

### github에서 배포할 때 scss, css에서 이미지는 절대경로로 작성하기

배포했을 때에 `index.html`에서 `<img src="./src/img/shortcut/news.png">` 라고 상대경로를 입력한 이미지 파일은 모두 렌더링이 잘 이뤄졌지만 그 외 scss, css 파일에서도 동일하게 상대경로를 통해 불러온 이미지들은 모두 렌더링이 이뤄지지 않았습니다. scss, css 파일에서는 `https://stillcorners.github.io/naverappclone/src/img/sp/sp_search.png` 와 같이 절대경로로 수정해서 입력했더니 이후 모든 이미지의 렌더링이 잘 이뤄졌습니다.

### font-size 값에 rem 단위를 지정하는 방법

1. 먼저 `html` 요소에 font-size를 지정합니다.
2. 그 뒤로 다양한 요소들에 1.8rem 과 같이 rem 단위를 사용한 값을 지정하는 것이 가능해집니다.

rem은 %와 비슷한 개념으로, 1rem은 100%이고 3rem은 300%와 같습니다. 지정한 루트 폰트 크기 (위 예시에서는 html 요소에 지정한 값) 의 배수로 반응형을 구현할 때에 유용하게 사용할 수 있습니다.

### `<a>`, `<button>` 차이점

`<a>`는 클릭했을 때에 다른 페이지로 이동합니다. 즉 다른 url로 연결됩니다. 로그인 페이지을 예시로 들 수 있습니다.

`<button>`은 현재 페이지 내에서 특정 기능이 필요할 때에 사용합니다. 다크 모드 버튼, 페이지 상단으로 이동하는 버튼을 예로 들 수 있습니다.

### `<em>`, `<strong>` 차이점

SEO를 고려한 시맨틱 마크업에 있어서 강조(highlighting)의 강도는 `em < strong` 이라고 볼 수 있습니다.
`<em>`은 기본 문맥적 강조를 위해 사용되며 `<strong>`은 내용의 긴급성, 중요성, 심각성을 표현합니다.

### scss 파일 대부분에는 맨 앞에 언더바를 붙인다

`_mixin.scss` 파일을 만든 다음에 다른 파일에서 import를 하면 파일명 맨 앞의 언더바가 생략되어서 `@import '/mixin';` 이라고만 나옵니다.

이렇게 언더바가 붙은 파일은 컴파일 되지 않습니다. 나중에 메인으로 사용하며 언더바가 붙지 않은 `main.scss` 와 같은 scss 파일 1개에서 모든 scss 파일들의 컴파일이 이뤄집니다.

이렇게 관리를 하면 수정이 편하고 용량은 가볍다는 장점이 있습니다.
