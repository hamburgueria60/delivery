module.exports = async app => {
  if (process.env.NODE_ENV === 'production') return

  await app.models.User.create({
    email: 'foo@bar.com',
    username: 'teste',
    password: '123',
  })

  await app.models.Category.create([
    { categoryId: 1, name: 'Sanduíche' },
    { categoryId: 2, name: 'Pizza' },
    { categoryId: 3, name: 'Suco' },
    { categoryId: 4, name: 'Bebida' },
    { categoryId: 5, name: 'Grelhado' },
    { categoryId: 6, name: 'Sopa' },
    { categoryId: 7, name: 'Vitamina' },
    { categoryId: 8, name: 'Sobremesa' },
    { categoryId: 9, name: 'Guarnição' },
    { categoryId: 10, name: 'Outros' },
  ])

  await app.models.Item.create([
    { itemId: 1, name: 'MISTO SIMPLES', price: 4, categoryId: 1 },
    { itemId: 2, name: 'MISTO DUPLO', price: 5, categoryId: 1 },
    { itemId: 3, name: 'AMERICANO', price: 5, categoryId: 1 },
    { itemId: 4, name: 'X-MAIONESE', price: 5, categoryId: 1 },
    { itemId: 5, name: 'HAMBÚRGUER', price: 4.5, categoryId: 1 },
    { itemId: 6, name: 'X-SALADA', price: 6, categoryId: 1 },
    { itemId: 7, name: 'X-SALSICHA', price: 7.5, categoryId: 1 },
    { itemId: 8, name: 'X-CALABRESA', price: 7.5, categoryId: 1 },
    { itemId: 9, name: 'X-TUDO', price: 13, categoryId: 1 },
    { itemId: 10, name: 'X-SALADA BACON', price: 9, categoryId: 1 },
    { itemId: 11, name: 'X-BACON', price: 8, categoryId: 1 },
    { itemId: 12, name: 'X-FILÉ', price: 14, categoryId: 1 },
    { itemId: 13, name: 'X-FRANGO', price: 12, categoryId: 1 },
    { itemId: 14, name: 'BIG CHEESE', price: 22, categoryId: 1 },
    { itemId: 15, name: 'SALADA CHEESE', price: 14, categoryId: 1 },
    { itemId: 16, name: 'BACON CHEESE', price: 18, categoryId: 1 },
    { itemId: 17, name: 'SALADA CHEESE TROPICAL', price: 17, categoryId: 1 },
    { itemId: 18, name: 'PIMENTA CHEESE', price: 16, categoryId: 1 },
    { itemId: 19, name: 'PIZZA MÉDIA TRADICIONAL', price: 23, categoryId: 2 },
    {
      itemId: 20,
      name: 'PIZZA GRANDE TRADICIONAL',
      price: 28,
      categoryId: 2,
    },
    {
      itemId: 21,
      name: 'PIZZA FAMÍLIA TRADICIONAL',
      price: 35,
      categoryId: 2,
    },
    { itemId: 22, name: 'PIZZA MÉDIA ESPECIAL', price: 30, categoryId: 2 },
    { itemId: 23, name: 'PIZZA GRANDE ESPECIAL', price: 35, categoryId: 2 },
    { itemId: 24, name: 'PIZZA FAMÍLIA  ESPECIAL', price: 40, categoryId: 2 },
    { itemId: 25, name: 'CARNE NA CHAPA', price: 15, categoryId: 5 },
    { itemId: 26, name: 'FRANGO NA CHAPA', price: 14, categoryId: 5 },
    {
      itemId: 27,
      name: 'CARNE E CALABRESA NA CHAPA',
      price: 20,
      categoryId: 5,
    },
    { itemId: 28, name: 'CARNE DE SOL NA CHAPA', price: 21, categoryId: 5 },
    { itemId: 29, name: 'PICANHA NA CHAPA', price: 22, categoryId: 5 },
    { itemId: 30, name: 'BATATA FRITA 250G', price: 10, categoryId: 9 },
    { itemId: 31, name: 'MACAXEIRA FRITA 250G', price: 10, categoryId: 9 },
    { itemId: 34, name: 'VITAMINA 370ML', price: 7, categoryId: 7 },
    { itemId: 35, name: 'VITAMINA 500ML', price: 10, categoryId: 7 },
    { itemId: 36, name: 'VITAMINA 1L', price: 15, categoryId: 7 },
    { itemId: 45, name: 'CERVEJA 350ML', price: 3.5, categoryId: 4 },
    { itemId: 47, name: 'AGUA MINERAL 500ML', price: 3, categoryId: 4 },
    { itemId: 49, name: 'X-BURGUER', price: 5, categoryId: 1 },
    { itemId: 50, name: 'FILÉ NA CHAPA', price: 22, categoryId: 5 },
    { itemId: 51, name: 'X-BANANA', price: 8, categoryId: 1 },
    { itemId: 52, name: 'MISTÃO', price: 8, categoryId: 1 },
    {
      itemId: 56,
      name: 'X-SALADA ESPECIAL ( 2 CARNES)',
      price: 8,
      categoryId: 1,
    },
    { itemId: 57, name: 'YAKISOBA DE CARNE', price: 20, categoryId: 10 },
    { itemId: 61, name: 'BAURU', price: 4.5, categoryId: 1 },
    { itemId: 64, name: 'HAMBURGUER CHESSE', price: 9, categoryId: 1 },
    {
      itemId: 65,
      name: 'PIZZA MÉDIA PREMIUM CARNE DE SOL',
      price: 40,
      categoryId: 2,
    },
    {
      itemId: 66,
      name: 'PIZZA GRANDE PREMIUM CARNE DE SOL',
      price: 45,
      categoryId: 2,
    },
    {
      itemId: 67,
      name: 'PIZZA FAMÍLIA PREMIUM CARNE DE SOL',
      price: 50,
      categoryId: 2,
    },
    {
      itemId: 68,
      name: 'PIZZA MÉDIA PREMIUM PICANHA',
      price: 40,
      categoryId: 2,
    },
    {
      itemId: 69,
      name: 'PIZZA GRANDE PREMIUM PICANHA',
      price: 45,
      categoryId: 2,
    },
    {
      itemId: 70,
      name: 'PIZZA FAMÍLIA PREMIUM PICANHA',
      price: 50,
      categoryId: 2,
    },
    {
      itemId: 71,
      name: 'YAKISOBA CAMARÃO E CARNE',
      price: 30,
      categoryId: 10,
    },
    {
      itemId: 72,
      name: 'COMBO1=XSALADA+BATATA+LATA',
      price: 15,
      categoryId: 1,
    },
    { itemId: 73, name: 'BISTECA NA CHAPA', price: 12, categoryId: 5 },
    {
      itemId: 74,
      name: 'CARNE DE SOL NA PEDRA 2 PESSOAS',
      price: 55,
      categoryId: 5,
    },
    {
      itemId: 80,
      name: 'PROMOÇÃO: PIZZA FAMÍLIA + TUCHAUA 2L',
      price: 35,
      categoryId: 2,
    },
    {
      itemId: 82,
      name: 'PICANHA NA PEDRA 2 PESSOAS',
      price: 60,
      categoryId: 5,
    },
    { itemId: 83, name: 'PEDRA MISTA 2 PESSOAS', price: 65, categoryId: 5 },
    { itemId: 84, name: 'PEDRA MISTA 4 PESSOAS', price: 105, categoryId: 5 },
    {
      itemId: 85,
      name: 'PICANHA NA PEDRA 4 PESSOAS',
      price: 100,
      categoryId: 5,
    },
    { itemId: 86, name: 'CARNE DE SOL 4 PESSOAS', price: 95, categoryId: 5 },
    {
      itemId: 89,
      name: 'YAKISOBA CAMARÃO E FRANGO',
      price: 30,
      categoryId: 10,
    },
    { itemId: 90, name: 'YAKISOBA DE FRANGO', price: 20, categoryId: 10 },
    {
      itemId: 91,
      name: 'YAKISOBA CARNE E FRANGO',
      price: 30,
      categoryId: 10,
    },
    { itemId: 92, name: 'ISCA DE CARNE', price: 20, categoryId: 5 },
    { itemId: 93, name: 'ISCA DE FRANGO', price: 20, categoryId: 5 },
    { itemId: 94, name: 'X-EGG', price: 5, categoryId: 1 },
    { itemId: 95, name: 'YAKISOBA CAMARÃO', price: 35, categoryId: 10 },
    { itemId: 96, name: 'QUEIJO SIMPLES', price: 4, categoryId: 1 },
    {
      itemId: 97,
      name: 'PROMOÇÃO PIZZA GRANDE+TUCHAUA 1,5L',
      price: 28,
      categoryId: 2,
    },
    { itemId: 98, name: 'QUEIJO DUPLO', price: 5, categoryId: 1 },
    {
      itemId: 99,
      name: 'PÃO COM MANTEIGA AMASSADO',
      price: 3,
      categoryId: 1,
    },
    { itemId: 100, name: 'REAL GOLD 2 LITROS', price: 7, categoryId: 4 },
    { itemId: 101, name: 'FRANGO COM CALABRESA', price: 20, categoryId: 5 },
    { itemId: 102, name: 'CALABRESA NA CHAPA', price: 20, categoryId: 5 },
    {
      itemId: 104,
      name: 'YAKISOBA DE CARNE E CALABRESA',
      price: 23,
      categoryId: 5,
    },
    { itemId: 106, name: 'COCA-COLA 2 LITROS', price: 10, categoryId: 4 },
    { itemId: 107, name: 'BARE 2 LITROS', price: 8, categoryId: 4 },
    { itemId: 108, name: 'ANTARTICA 2 LITROS', price: 9, categoryId: 4 },
    { itemId: 109, name: 'REGENTE 2 LITROS', price: 7, categoryId: 4 },
    { itemId: 112, name: 'COCA-COLA 1/5', price: 9, categoryId: 4 },
    { itemId: 113, name: 'FANTA LARANJA 1/5', price: 9, categoryId: 4 },
    { itemId: 114, name: 'REGENTE 1/5', price: 6, categoryId: 4 },
    { itemId: 115, name: 'FANTA UVA 1/5', price: 9, categoryId: 4 },
    { itemId: 116, name: 'COCA-COLA 1 LITRO', price: 7, categoryId: 4 },
    { itemId: 117, name: 'FANTA LARANJA 1 LITRO', price: 7, categoryId: 4 },
    { itemId: 118, name: 'COCA-COLA LATA', price: 4, categoryId: 4 },
    { itemId: 119, name: 'FANTA LARANJA LATA', price: 4, categoryId: 4 },
    { itemId: 120, name: 'FANTA UVA LATA', price: 4, categoryId: 4 },
    { itemId: 121, name: 'ANTARTICA LATA', price: 4, categoryId: 4 },
    { itemId: 122, name: 'BARE LATA', price: 4, categoryId: 4 },
    { itemId: 123, name: 'PEPSI LATA', price: 4, categoryId: 4 },
    { itemId: 124, name: 'REGENTE LATA', price: 4, categoryId: 4 },
    {
      itemId: 125,
      name: 'COMBO2=SALADACHESSE+BATATA+COCA',
      price: 20,
      categoryId: 4,
    },
    { itemId: 126, name: 'TIRA GOSTO', price: 20, categoryId: 10 },
    {
      itemId: 127,
      name: 'PROMOÇÃO PIZZA MÉDIA + TUCHAUA 1/5',
      price: 23,
      categoryId: 2,
    },
    {
      itemId: 131,
      name: 'ISCA DE CARNE E CALABRESA',
      price: 23,
      categoryId: 5,
    },
    { itemId: 135, name: 'TUCHAUA 2 LITROS', price: 7, categoryId: 4 },
    { itemId: 136, name: 'TUCHAUA 1/5', price: 6, categoryId: 4 },
    { itemId: 138, name: 'COCA-COLA 600 ML', price: 5, categoryId: 4 },
    {
      itemId: 140,
      name: 'BANANA FRITA (UMA BANANA INTEIRA)',
      price: 8,
      categoryId: 8,
    },
    { itemId: 141, name: 'ICE 51', price: 6, categoryId: 4 },
    {
      itemId: 142,
      name: 'PIZZA MÉDIA PREMIUM   ALCATRA C/ CHEDDAR',
      price: 40,
      categoryId: 2,
    },
    {
      itemId: 143,
      name: 'PIZZA GRANDE PREMIUM  ALCATRA C/ CHEDDAR',
      price: 45,
      categoryId: 2,
    },
    {
      itemId: 144,
      name: 'PIZZA FAMÍLIA  PREMIUM ALCATRA C/ CHEDDAR',
      price: 50,
      categoryId: 2,
    },
    {
      itemId: 148,
      name: 'PIZZA FAMÍLIA PREMIUM  FILÉ',
      price: 50,
      categoryId: 2,
    },
    {
      itemId: 149,
      name: 'PIZZA GRANDE PREMIUM  FILÉ',
      price: 45,
      categoryId: 2,
    },
    {
      itemId: 150,
      name: 'PIZZA MEDIA PREMIUM  FILÉ',
      price: 40,
      categoryId: 2,
    },
    { itemId: 151, name: 'COPO MARACUJÁ', price: 5, categoryId: 3 },
    { itemId: 152, name: 'MEIA JARRA MARACUJÁ', price: 8, categoryId: 3 },
    { itemId: 153, name: 'JARRA MARACUJÁ', price: 12, categoryId: 3 },
    { itemId: 154, name: 'COPO ACEROLA', price: 5, categoryId: 3 },
    { itemId: 155, name: 'MEIA JARRA ACEROLA', price: 8, categoryId: 2 },
    { itemId: 156, name: 'JARRA ACEROLA', price: 12, categoryId: 3 },
    { itemId: 157, name: 'MEIA JARRA ACEROLA', price: 8, categoryId: 3 },
    { itemId: 158, name: 'COPO GOIABA', price: 5, categoryId: 3 },
    { itemId: 159, name: 'MEIA JARRA GOIABA', price: 8, categoryId: 3 },
    { itemId: 160, name: 'JARRA GOIABA', price: 12, categoryId: 3 },
    { itemId: 161, name: 'COPO GRAVIOLA', price: 5, categoryId: 3 },
    { itemId: 162, name: 'MEIA JARRA GRAVIOLA', price: 8, categoryId: 3 },
    { itemId: 163, name: 'JARRA GRAVIOLA', price: 12, categoryId: 2 },
    { itemId: 164, name: 'COPO CUPUAÇU', price: 5, categoryId: 3 },
    { itemId: 165, name: 'MEIA JARRA CUPUAÇU', price: 8, categoryId: 3 },
    { itemId: 166, name: 'JARRA CUPUAÇU', price: 12, categoryId: 3 },
    { itemId: 167, name: 'COPO TAPEREBÁ', price: 5, categoryId: 3 },
    { itemId: 168, name: 'MEIA  TAPEREBÁ', price: 8, categoryId: 3 },
    { itemId: 169, name: 'JARRA  TAPEREBÁ', price: 12, categoryId: 3 },
    { itemId: 171, name: 'FANTA UVA 2 LITROS', price: 10, categoryId: 4 },
    { itemId: 175, name: 'SALADA LITH', price: 8, categoryId: 5 },
    { itemId: 176, name: 'FANTA  LARANJA 600 ML', price: 5, categoryId: 4 },
    {
      itemId: 177,
      name: 'PROMOÇÃO 3XSALADA+TUCHAUA 1/5',
      price: 22,
      categoryId: 1,
    },
    {
      itemId: 178,
      name: 'PIZZA MÉDIA ESPECIAL BANANA',
      price: 30,
      categoryId: 2,
    },
    {
      itemId: 179,
      name: 'PIZZA GRANDE ESPECIAL BANANA',
      price: 35,
      categoryId: 2,
    },
    {
      itemId: 180,
      name: 'PIZZA FAMILIA ESPECIAL BANANA',
      price: 40,
      categoryId: 2,
    },
    {
      itemId: 181,
      name: 'PIZZA MÉDIA ESPECIAL DOCE',
      price: 30,
      categoryId: 2,
    },
    {
      itemId: 182,
      name: 'PIZZA GRANDE ESPECIAL DOCE',
      price: 35,
      categoryId: 2,
    },
    {
      itemId: 183,
      name: 'PIZZA FAMILIA ESPECIAL DOCE',
      price: 40,
      categoryId: 2,
    },
    { itemId: 184, name: 'VINHO MEIA TAÇA', price: 5, categoryId: 4 },
    { itemId: 185, name: 'VINHO UMA TAÇA', price: 10, categoryId: 4 },
    { itemId: 186, name: 'ACRÉSCIMO 2', price: 2, categoryId: 10 },
    { itemId: 187, name: 'ACRÉSCIMO 3', price: 3, categoryId: 10 },
    { itemId: 188, name: 'ACRÉSCIMO 4', price: 4, categoryId: 10 },
    { itemId: 189, name: 'ACRÉSCIMO 5', price: 5, categoryId: 10 },
    { itemId: 190, name: 'ACRÉSCIMO 6', price: 6, categoryId: 10 },
    { itemId: 191, name: 'MEIA JARRA ABACAXI', price: 9, categoryId: 3 },
    { itemId: 192, name: 'ANTARTICA 1/5', price: 8, categoryId: 4 },
    { itemId: 193, name: 'ACRÉSCIMO 10', price: 10, categoryId: 10 },
    {
      itemId: 194,
      name: 'SUPER COMBO -2 PIZZA GRANDE TRAD. + COCA 3LITROS',
      price: 65,
      categoryId: 2,
    },
    {
      itemId: 195,
      name: 'COMBO FAMÍLIA - 5 X SALADA + COCA 3 LITROS',
      price: 38,
      categoryId: 1,
    },
    { itemId: 196, name: 'COCA-COCA 3 LITROS', price: 15, categoryId: 4 },
    { itemId: 197, name: 'CARNE CHEESE', price: 7, categoryId: 1 },
    { itemId: 198, name: 'ICE BALADA', price: 6, categoryId: 4 },
    {
      itemId: 199,
      name: 'PRATO EXECUTIVO=BISTECA/ARRO/BAIÃO/SALADA/FAROFA',
      price: 10,
      categoryId: 5,
    },
    { itemId: 200, name: 'BISTECA NA PEDRA', price: 45, categoryId: 5 },
    { itemId: 201, name: 'SCOOL BITS', price: 4.5, categoryId: 4 },
  ])

  await app.models.DeliveryTax.create([
    { taxId: 2, neighborhood: 'Fátima II', value: 3 },
    { taxId: 6, neighborhood: 'Galiléia', value: 10 },
    { taxId: 10, neighborhood: 'Núcleo 11', value: 5 },
    { taxId: 11, neighborhood: 'Núcleo 8', value: 5 },
    { taxId: 12, neighborhood: 'Núcleo 13', value: 4 },
    { taxId: 14, neighborhood: 'Núcleo 23', value: 5 },
    { taxId: 18, neighborhood: 'Comunidade Bom Jesus', value: 2 },
    { taxId: 20, neighborhood: 'Villa Nova', value: 5 },
    { taxId: 22, neighborhood: 'Osvaldo I', value: 5 },
    { taxId: 26, neighborhood: 'Campo Dourado', value: 5 },
    { taxId: 27, neighborhood: 'Gustavo Nascimento', value: 5 },
    { taxId: 28, neighborhood: 'Jorge Teixeira', value: 10 },
    { taxId: 29, neighborhood: 'Braga Mendes', value: 8 },
    { taxId: 32, neighborhood: 'ALIANÇA COM DEUS', value: 5 },
    { taxId: 35, neighborhood: 'Cidade De Deus', value: 5 },
    { taxId: 40, neighborhood: 'Núcleo 12', value: 5 },
    { taxId: 51, neighborhood: 'Fátima I', value: 5 },
    { taxId: 53, neighborhood: 'Núcleo 9', value: 3 },
    { taxId: 57, neighborhood: 'Benhur', value: 5 },
    { taxId: 58, neighborhood: 'Núcleo 15', value: 7 },
    { taxId: 60, neighborhood: 'Núcleo 14', value: 5 },
    { taxId: 62, neighborhood: 'Villa Real', value: 2 },
    { taxId: 64, neighborhood: 'Tancredo Neves', value: 10 },
    { taxId: 69, neighborhood: 'Renato Souza Pinto I', value: 0 },
    { taxId: 70, neighborhood: 'Núcleo 4', value: 5 },
    { taxId: 72, neighborhood: 'Osvaldo II', value: 5 },
    { taxId: 76, neighborhood: 'Núcleo 10', value: 5 },
    { taxId: 80, neighborhood: 'Monte Sinai', value: 10 },
    { taxId: 81, neighborhood: 'Boas Novas', value: 10 },
    { taxId: 84, neighborhood: 'Conjunto Amadeu Botelho', value: 5 },
    { taxId: 90, neighborhood: 'Nova Cidade (QUADRA 119A)', value: 0 },
    { taxId: 92, neighborhood: 'Monte Sião', value: 10 },
    { taxId: 93, neighborhood: 'Riacho Doce II', value: 5 },
    { taxId: 95, neighborhood: 'Núcleo 16', value: 8 },
    { taxId: 101, neighborhood: 'Núcleo 5', value: 5 },
    { taxId: 104, neighborhood: 'São José II', value: 0 },
    { taxId: 105, neighborhood: 'Terra Nova III', value: 10 },
    {
      taxId: 109,
      neighborhood: 'Nossa Senhora Do Perpétuo Socorro',
      value: 8,
    },
    { taxId: 110, neighborhood: 'São José II Etapa B', value: 0 },
    { taxId: 112, neighborhood: 'Núcleo I', value: 5 },
    { taxId: 115, neighborhood: 'Riacho Doce III', value: 7 },
    { taxId: 116, neighborhood: 'Núcleo 21', value: 5 },
    { taxId: 117, neighborhood: 'Núcleo 3', value: 8 },
    { taxId: 119, neighborhood: 'Novo Israel', value: 0 },
    { taxId: 121, neighborhood: 'Conjunto Sergio Pessoa Neto', value: 5 },
    { taxId: 122, neighborhood: 'Multirão', value: 8 },
    { taxId: 123, neighborhood: 'Núcleo 7', value: 5 },
    { taxId: 124, neighborhood: 'Viver Melhor II', value: 5 },
    { taxId: 129, neighborhood: 'Fazendinha', value: 3 },
    { taxId: 130, neighborhood: 'Nova Cidade', value: 10 },
    {
      taxId: 133,
      neighborhood: 'Benhur ( Ao Lado Do Prédio ) Quadra B',
      value: 5,
    },
    { taxId: 136, neighborhood: 'Final Da Rua Última Casa', value: 2 },
    { taxId: 138, neighborhood: 'Cidade De Deus/ Villa Nova', value: 5 },
    { taxId: 139, neighborhood: 'Cidade Nova', value: 5 },
    { taxId: 140, neighborhood: 'Cj. Cidadão I', value: 2 },
    { taxId: 141, neighborhood: 'Novo Aleixo', value: 8 },
    { taxId: 144, neighborhood: 'Cidade Nova I', value: 5 },
    { taxId: 145, neighborhood: 'Val Paraiso', value: 10 },
    { taxId: 146, neighborhood: 'Viver Melhor III', value: 5 },
    { taxId: 148, neighborhood: 'Loteamento Fazendinha', value: 3 },
    { taxId: 149, neighborhood: 'FatimaII', value: 3 },
    { taxId: 150, neighborhood: 'Villa Reall', value: 2 },
    { taxId: 151, neighborhood: 'Riacho Doce', value: 6 },
    { taxId: 152, neighborhood: 'Jorge Teixeira IEtapa', value: 7 },
    { taxId: 153, neighborhood: 'Fatima 2', value: 3 },
    { taxId: 154, neighborhood: 'Osvaldo Frota II', value: 5 },
    { taxId: 157, neighborhood: 'Sérgio Pessoa', value: 8 },
    { taxId: 158, neighborhood: 'Núcleo 22', value: 5 },
    { taxId: 159, neighborhood: 'Fazendinha II', value: 3 },
    { taxId: 161, neighborhood: 'Nossa Senhora De Fátima 2', value: 3 },
    { taxId: 163, neighborhood: 'Vila Real', value: 2 },
    { taxId: 164, neighborhood: 'Oswaldo Frota I', value: 5 },
    { taxId: 165, neighborhood: 'Cidade Nova II', value: 4 },
    { taxId: 166, neighborhood: 'Nossa Senhora De Fátima', value: 3 },
    { taxId: 167, neighborhood: 'Nossa Senhora De Fátima II', value: 3 },
    { taxId: 168, neighborhood: 'Nova Floresta', value: 0 },
    { taxId: 169, neighborhood: 'Osvaldo Frota', value: 5 },
    { taxId: 170, neighborhood: 'Com. Bom Jesus', value: 3 },
    { taxId: 171, neighborhood: 'Santa Inês', value: 10 },
    { taxId: 172, neighborhood: 'Jorge Teixeira II Etapa', value: 0 },
    { taxId: 175, neighborhood: 'Jorge Teixeira 4 Etapa', value: 10 },
    { taxId: 177, neighborhood: 'Núcleo 8', value: 5 },
    { taxId: 179, neighborhood: 'Parque Das Laranjeiras', value: 0 },
    { taxId: 180, neighborhood: 'Manoa', value: 15 },
    { taxId: 181, neighborhood: 'Monte Das Oliveiras', value: 10 },
    { taxId: 182, neighborhood: 'Renato Souza Pinto II', value: 8 },
    { taxId: 183, neighborhood: 'Núcleo 24', value: 8 },
    { taxId: 184, neighborhood: 'Cidade Nova 4(núcleo 16)', value: 8 },
    { taxId: 185, neighborhood: 'Villa Da Barra', value: 10 },
    { taxId: 186, neighborhood: 'Ribeiro Júnior', value: 8 },
    { taxId: 187, neighborhood: 'Conj. Bom Jesus', value: 3 },
    { taxId: 188, neighborhood: 'Riacho Doce I', value: 5 },
    {
      taxId: 189,
      neighborhood: 'Cidade De Deus  (Pousada Cristal )',
      value: 5,
    },
    { taxId: 190, neighborhood: 'Japiim I', value: 0 },
    { taxId: 193, neighborhood: 'AMÉRICO MEDEIROS', value: 6 },
    { taxId: 194, neighborhood: 'Jorge Teixeira 4', value: 10 },
    { taxId: 196, neighborhood: 'BAIRRO NOVO', value: 5 },
    { taxId: 198, neighborhood: 'Conj. Américo Medeiros', value: 5 },
    { taxId: 200, neighborhood: 'ConstruForte', value: 2 },
    { taxId: 203, neighborhood: 'Jorge Texeira 4ª Etapa', value: 10 },
    { taxId: 204, neighborhood: 'Mercadinho Junior', value: 2 },
    { taxId: 205, neighborhood: 'Conj Américo Medeiros', value: 5 },
    { taxId: 208, neighborhood: 'Fátima  I', value: 5 },
    { taxId: 209, neighborhood: 'Conj Vila Real', value: 2 },
    { taxId: 210, neighborhood: 'Canaranas', value: 2 },
    { taxId: 211, neighborhood: 'Renato II', value: 8 },
    { taxId: 212, neighborhood: 'Riacho Doce I', value: 5 },
    { taxId: 213, neighborhood: 'Renato I', value: 8 },
    { taxId: 214, neighborhood: 'Osvaldo Frotra I', value: 5 },
    {
      taxId: 215,
      neighborhood: 'Fátima I ( AVISAR ANTES DE SAIR CLIENTE MORA NOS FUNDOS)',
      value: 5,
    },
    { taxId: 216, neighborhood: 'Osvaldo Frota I', value: 5 },
    { taxId: 218, neighborhood: 'Conjunto Cidadão', value: 2 },
    { taxId: 220, neighborhood: 'Conjunto Americo Mederos', value: 5 },
    { taxId: 222, neighborhood: 'Oswaldo Frota', value: 5 },
    { taxId: 223, neighborhood: 'Fanzendinha', value: 3 },
    { taxId: 224, neighborhood: 'Renato Sousa Pinto II', value: 8 },
    { taxId: 225, neighborhood: 'Nossa Senhora Fatima I', value: 4 },
    {
      taxId: 226,
      neighborhood: 'Multirão ( NÃO FAZER PEDIDO PRA ESSE ENDEREÇO PELA DISTANCIA)',
      value: 8,
    },
    {
      taxId: 227,
      neighborhood: 'Jorge Teixeira I ( NÃO FAZER PEDIDO BAIRRO DISTANTE)',
      value: 10,
    },
    { taxId: 228, neighborhood: 'Canaranas', value: 2 },
    { taxId: 230, neighborhood: 'Cidade Deus', value: 5 },
    { taxId: 231, neighborhood: 'Osvaldo', value: 5 },
    { taxId: 232, neighborhood: 'Núcleo 24', value: 8 },
    { taxId: 234, neighborhood: 'Conj: Pessoa Neto', value: 5 },
    { taxId: 235, neighborhood: 'OSVALDO FROTO I', value: 5 },
    {
      taxId: 236,
      neighborhood: 'Na Frente Do Marias Lanche.  Ou  Do Lado Do Cabeleireiro Kuka',
      value: 3,
    },
    {
      taxId: 237,
      neighborhood: 'Jorge Teixeira I (LIBERADO PRA ENTREGA)',
      value: 5,
    },
    { taxId: 238, neighborhood: 'Con: Osvaldo Frota II', value: 5 },
    { taxId: 239, neighborhood: 'FAZENDINHA -', value: 3 },
    { taxId: 240, neighborhood: 'Núcleo 6', value: 5 },
    { taxId: 241, neighborhood: 'Cidadão  I', value: 2 },
    { taxId: 242, neighborhood: 'Francisca Mendes II', value: 4 },
    { taxId: 243, neighborhood: 'Francisca Mendes', value: 4 },
    { taxId: 245, neighborhood: 'AV CAMAPUÃ', value: 3 },
    { taxId: 248, neighborhood: 'Jorge Teixeira 4ª Etapa', value: 10 },
    { taxId: 249, neighborhood: 'Noel Nútleos', value: 3 },
    { taxId: 250, neighborhood: 'Fátima  II', value: 3 },
    { taxId: 251, neighborhood: 'Núcleo  4', value: 6 },
    { taxId: 252, neighborhood: 'NÚCLEO 4', value: 5 },
    { taxId: 253, neighborhood: 'ALFREDO NASCIMENTO', value: 5 },
    { taxId: 255, neighborhood: 'NÚCLEO 2', value: 6 },
    { taxId: 256, neighborhood: 'Conj. Galileia', value: 10 },
    { taxId: 257, neighborhood: 'Col Santo Antonio', value: 10 },
    { taxId: 259, neighborhood: 'Comunidade Raio De Sol', value: 10 },
    { taxId: 260, neighborhood: 'Cidade Nova 2', value: 3 },
    {
      taxId: 261,
      neighborhood: 'BOA NOVAS ( AVENIDA DAS TORRES)',
      value: 10,
    },
    { taxId: 262, neighborhood: 'CANARNAS II', value: 2 },
    { taxId: 263, neighborhood: 'CIDADE DE SEUS', value: 5 },
    { taxId: 264, neighborhood: 'Jorge Teixeira I Etapa', value: 7 },
    { taxId: 265, neighborhood: 'Jorge Teixeira IIII', value: 10 },
    { taxId: 266, neighborhood: 'PARQUE DOS BURITIS', value: 10 },
    { taxId: 267, neighborhood: 'Nucleo  09', value: 3 },
    {
      taxId: 268,
      neighborhood: 'Monte Das Oliveiras ( NÃO FAZER PEDIDO PELA DISTANCIA )',
      value: 10,
    },
    { taxId: 269, neighborhood: 'Francisca Mendes 2', value: 4 },
    { taxId: 270, neighborhood: 'Jesus Me Deu', value: 2 },
    { taxId: 271, neighborhood: 'Jorge Teixeira IV', value: 10 },
    { taxId: 272, neighborhood: 'Jorge Teixeira I', value: 7 },
    { taxId: 274, neighborhood: 'Parque Das Nações', value: 10 },
    { taxId: 276, neighborhood: 'FRANCISCA MENDES  II', value: 4 },
    { taxId: 277, neighborhood: 'Conjunto Francisca Mendes 2', value: 4 },
    { taxId: 278, neighborhood: 'Cidade De Deus,', value: 5 },
    { taxId: 279, neighborhood: 'TERRA NOVA II', value: 10 },
    { taxId: 281, neighborhood: 'Osvaldo Americo', value: 6 },
    { taxId: 285, neighborhood: 'Renato Souza Pinto', value: 8 },
    { taxId: 287, neighborhood: 'COMUNIDADE BOM JESEUS', value: 2 },
    { taxId: 288, neighborhood: 'Jorge Texeira 4 Etapa', value: 10 },
    { taxId: 289, neighborhood: 'Conjunto Mundo Novo', value: 10 },
    { taxId: 290, neighborhood: 'ÁGUAS CLARAS', value: 10 },
    { taxId: 291, neighborhood: 'COLÔNIA SANTO ANTONIO', value: 10 },
    { taxId: 292, neighborhood: 'FAZENDINHA 2', value: 3 },
    { taxId: 293, neighborhood: 'JORGE TEXEIRA  4 ETAPA', value: 10 },
    { taxId: 294, neighborhood: 'Eduardo  Braga', value: 8 },
    { taxId: 295, neighborhood: 'Nossa Senhora Perpétuo Socorro', value: 8 },
    { taxId: 296, neighborhood: 'Campo Dourado 2', value: 7 },
    { taxId: 297, neighborhood: 'Fazendinha 2 ( Não É Na Ivasão)', value: 3 },
    { taxId: 298, neighborhood: 'ARMANDO MENDES', value: 15 },
    { taxId: 299, neighborhood: 'Jorge Teixeira 1ª Etapa', value: 7 },
    { taxId: 300, neighborhood: 'Penetração I', value: 3 },
    { taxId: 301, neighborhood: 'Osvaldo Frota 2', value: 5 },
    { taxId: 302, neighborhood: 'Mutirão', value: 10 },
    { taxId: 303, neighborhood: 'FAZENDINHA  2', value: 3 },
    { taxId: 305, neighborhood: 'João Paulo', value: 10 },
    {
      taxId: 308,
      neighborhood: 'FAZENDINHA  - FINAL DA RUA MOTEL 4ª CASA TEM UMA MANGUEIRA',
      value: 3,
    },
    { taxId: 309, neighborhood: 'Canaranas II', value: 2 },
    { taxId: 310, neighborhood: 'Canaranas I', value: 2 },
    { taxId: 311, neighborhood: 'Cananranas I', value: 2 },
    { taxId: 312, neighborhood: 'Canaranas I', value: 2 },
    { taxId: 314, neighborhood: 'AMAZONINO MENDES', value: 8 },
    { taxId: 315, neighborhood: 'Canaranas  II', value: 2 },
    { taxId: 316, neighborhood: 'Canaranas II', value: 2 },
    { taxId: 317, neighborhood: 'CANARANAS I -', value: 2 },
    { taxId: 319, neighborhood: 'Núcleo 1', value: 5 },
    { taxId: 320, neighborhood: 'Com Bom Jesus', value: 2 },
    { taxId: 321, neighborhood: 'JORGE TEIXEIRA II', value: 8 },
    { taxId: 322, neighborhood: 'Jorge Teixeira III', value: 10 },
    { taxId: 323, neighborhood: 'Colhereiras', value: 3 },
    { taxId: 324, neighborhood: 'Caranaranas I', value: 2 },
    { taxId: 325, neighborhood: 'CANANARAS I', value: 2 },
    { taxId: 326, neighborhood: 'Jorge Texeira', value: 10 },
    { taxId: 328, neighborhood: 'Oswaldo Frota II', value: 5 },
    { taxId: 329, neighborhood: 'Núcleo 09', value: 3 },
    { taxId: 330, neighborhood: 'Canaranas  I', value: 2 },
    { taxId: 333, neighborhood: 'Jorge Teixeira III Etapa', value: 10 },
    { taxId: 334, neighborhood: 'Terra Nova', value: 10 },
    { taxId: 335, neighborhood: 'Conjunto Galileia I', value: 10 },
    { taxId: 336, neighborhood: 'Flores', value: 10 },
    { taxId: 337, neighborhood: 'Osvaldo  Frota II', value: 5 },
    { taxId: 338, neighborhood: 'Amazonino Mendes II', value: 8 },
    { taxId: 339, neighborhood: 'Jorge Teixeira 1 Etapa', value: 7 },
    { taxId: 340, neighborhood: 'Riacho Doce 1', value: 5 },
    { taxId: 341, neighborhood: 'ViIla Nova', value: 5 },
    { taxId: 342, neighborhood: 'Alfredo  Nascimento', value: 5 },
    { taxId: 343, neighborhood: 'Alfredo', value: 5 },
    { taxId: 344, neighborhood: 'ALFREDO NASCIMENTO ( OMAR AZIZ)', value: 5 },
    { taxId: 345, neighborhood: 'VIVER MELHOR II  -', value: 5 },
    { taxId: 346, neighborhood: 'CANANARANAS II', value: 2 },
    { taxId: 347, neighborhood: 'Francisco Mendes II', value: 4 },
    {
      taxId: 348,
      neighborhood: 'Nossa Senhora De Perpetuo Socorro',
      value: 8,
    },
    { taxId: 349, neighborhood: 'Vila Nova', value: 5 },
    {
      taxId: 350,
      neighborhood: 'Cidadão I  - Avisar Sempre Antes De Sair',
      value: 2,
    },
    { taxId: 351, neighborhood: 'Canaranas 2', value: 2 },
    { taxId: 352, neighborhood: 'Segio Pessoa Neto', value: 5 },
    { taxId: 353, neighborhood: 'Fazedinha', value: 3 },
    {
      taxId: 354,
      neighborhood: 'Atrás Na União Cascavel - Na Frente Da Mekitos',
      value: 3,
    },
    { taxId: 355, neighborhood: 'Numero', value: 3 },
    { taxId: 356, neighborhood: 'CANARANAS II - AVISAR', value: 2 },
    { taxId: 357, neighborhood: 'Rua São Marçal, 225', value: 5 },
    { taxId: 358, neighborhood: 'CANANARAS II', value: 2 },
    { taxId: 359, neighborhood: 'Canarana II', value: 2 },
    { taxId: 360, neighborhood: 'Núcleo C-5', value: 5 },
    { taxId: 361, neighborhood: 'HOSPITAL PLATÃO', value: 8 },
    { taxId: 362, neighborhood: 'Jorge Teixeira 4° Etapa', value: 10 },
    { taxId: 363, neighborhood: 'Conjunto Vila Real', value: 2 },
    { taxId: 364, neighborhood: 'Bem Hur', value: 5 },
    { taxId: 365, neighborhood: 'RAIO DO SOL', value: 8 },
    { taxId: 366, neighborhood: 'Jorge Texeira 2 Etapa', value: 10 },
    { taxId: 367, neighborhood: '00000', value: 4 },
    { taxId: 368, neighborhood: 'Canarana I', value: 2 },
  ])

  await app.models.Client.create({
    clientId: 7,
    name: 'Richard Lopes',
    createdAt: '2016-01-03T05:18:16.000Z',
    updatedAt: '2018-10-12T21:58:14.000Z',
  })

  await app.models.Address.create({
    addressId: 11,
    streetName: 'Rua 41',
    block: null,
    number: '839',
    details: null,
    neighborhood: 'Japiim I',
    referencePoint: 'Prox. Ao Ponto Do Queijo 2',
    geolocation: null,
  })

  await app.models.ClientAddress.create({
    clientAddressId: 11,
    clientId: 7,
    addressId: 11,
  })

  await app.models.Telephone.create({
    telephoneId: 2,
    number: '92991095426',
    clientId: 7,
  })
}
