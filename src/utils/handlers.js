export const clickOnKeyPress = e => {
  if (["Enter", " "].includes(e.key)) {
    e.preventDefault()
    e.target.click()
  }
}
