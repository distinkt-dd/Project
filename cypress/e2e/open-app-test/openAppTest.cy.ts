describe('проверяем доступность приложеия', function () {
  it('сервис должен быть доступен по адресу localhost:5173', function () {
    cy.visit('http://localhost:5173');
  });
});
