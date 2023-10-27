const cedulas = [
  { DUZENTOS_REAIS: 200 },
  { CEM_REAIS: 100 },
  { CINQUENTA_REAIS: 50 },
  { VINTE_REAIS: 20 },
  { DEZ_REAIS: 10 },
  { CINCO_REAIS: 5 },
  { DOIS_REAIS: 2 },
];

const saque = (valor) => {
  let valorCorrente = valor;
  let response = [];

  cedulas.forEach((cedula) => {
    const key = Object.keys(cedula)[0];

    // como será feita uma divisão o valor tem que ser maior que a cédula corrente
    if (cedula[key] > valorCorrente) return;
    // obtendo o módulo da divisão
    const modulo = valorCorrente % cedula[key];
    // obtendo a quantidade de cédulas para o valor corrente
    const qtdCedulas = Math.floor(valorCorrente / cedula[key]);

    // Se a quantidade de cédulas é 1 e o resto é 1 não tem como usar a cédula corrente. Exemplo cédula de dez reais, saque onze... 1 nota de 10 sobra 1 real, não dá pra usar a cédula
    if ([1, 3].includes(modulo) && qtdCedulas === 1) return;

    // Se a combinação for:
    if (
      valorCorrente % 2 !== 0 && // valor corrente ímpar
      [1, 3].includes(modulo) && // módulo igual a 1 ou 3
      qtdCedulas >= 2 // quantidade de cédulas a partir de 2
    ) {
      valorCorrente -= cedula[key] * (qtdCedulas - 1);
      response.push({ [key]: { qtdCedulas: qtdCedulas - 1 } });
      return;
    }

    // em regra geral debita-se do valor corrente a quantidade de cédulas vezes a cédula corrente
    valorCorrente -= qtdCedulas * cedula[key];
    response.push({ [key]: { qtdCedulas } });
  });

  console.log(`Sacando R$ ${valor},00`);
  console.log(response);
  if (valorCorrente !== 0) {
    console.log('VALOR INVÁLIDO PARA SAQUE!');
  }
  console.log(
    `===========================================================================================================================================`
  );
};

for (let i = 1; i <= 1000; i++) {
  saque(i);
}
