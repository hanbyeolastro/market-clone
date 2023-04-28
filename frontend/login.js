const form = document.querySelector("#login-form");

const handleSubmit = async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const sha256Password = sha256(formData.get("password"));
  formData.set("password", sha256Password);

  const res = await fetch("/login", {
    method: "post",
    body: formData,
  });
  const data = await res.json();
  const accessToken = data.access_token;
  if (accessToken) {
    localStorage.setItem("token", accessToken);
    window.location.pathname = "/";
  }

  // //   모든 아이템 리스트 조회
  // console.log(accessToken);
  // const res2 = await fetch("/items", {
  //   headers: {
  //     Authorization: "Bearer " + accessToken,
  //   },
  // });
  // const data2 = await res2.json();
  // console.log(data2);

  //   if (res.status === 200) {
  //     alert("로그인에 성공했습니다!");
  //     window.location.pathname = "/";
  //   } else if (res.status === 401) {
  //     alert("id 혹은 password가 틀렸습니다.");
  //   }
};

form.addEventListener("submit", handleSubmit);
