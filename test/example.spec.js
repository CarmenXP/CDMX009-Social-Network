function checkEmailFake(email){
  if(email!="") return "Ingresaste tu correo bien"
}

test("Email validation", ()=>{
  let correo="algo@algo.com"
  expect(checkEmailFake(correo)).toBe("Ingresaste tu correo bien")
})