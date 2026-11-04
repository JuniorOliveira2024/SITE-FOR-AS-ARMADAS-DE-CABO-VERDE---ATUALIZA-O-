/* ============================================================
   Dados de notícias — partilhado entre index.html e noticia.html
   ============================================================ */

const NEWS_ARTICLES = {
  'posse-cemfa': {
    title: 'Contra-Almirante Manuel António Pereira Semedo toma posse como novo Chefe do Estado-Maior das Forças Armadas',
    date: '08 de novembro de 2025', tag: 'Tomada de Posse',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Pal%C3%A1cio_do_governo_(11223820464).jpg',
    paragraphs: [
      'O Presidente da República e Comandante Supremo das Forças Armadas, Dr. José Maria Pereira Neves, presidiu à cerimónia de tomada de posse do novo Chefe do Estado-Maior das Forças Armadas, no Palácio da Presidência, na Cidade da Praia.',
      'Na sua intervenção, o Comandante Supremo destacou a continuidade institucional e a importância da disciplina, lealdade e profissionalismo que têm caracterizado as Forças Armadas de Cabo Verde ao longo da sua história. A cerimónia contou com a presença de altas entidades civis e militares, representantes diplomáticos e familiares do novo Chefe do Estado-Maior.',
      'O Contra-Almirante Manuel António Pereira Semedo assume assim a mais alta responsabilidade de comando operacional das Forças Armadas, com um percurso profissional marcado pela dedicação ao serviço da Nação.'
    ]
  },
  'cimmb-incorporacao': {
    title: 'CIMMB entra na fase final da 2ª Incorporação de 2025, com 289 recrutas',
    date: '14 de novembro de 2025', tag: 'Formação',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Kanonen_vor_Kaserne_Quartel_Jaime_Mota_Plato_Praia,_Santiago.JPG',
    paragraphs: [
      'O Centro de Instrução Militar do Morro Branco (CIMMB) entrou na fase final da 2ª Incorporação de 2025, que conta com 289 recrutas, entre os quais nove mulheres, na etapa decisiva da preparação militar.',
      'Os recrutas têm vindo a ser submetidos a um programa intensivo de instrução física, técnica e cívica, que culminará na Ratificação do Juramento à Bandeira Nacional, marco simbólico que assinala a sua entrada formal nas fileiras das Forças Armadas.',
      'O programa de formação inclui ainda módulos do Programa Soldado Cidadão, com formação técnico-profissional e educação para a cidadania.'
    ]
  },
  'feira-saude': {
    title: 'Forças Armadas realizam Feira de Saúde no Plateau, no âmbito do Dia da Defesa Nacional',
    date: '15 de novembro de 2025', tag: 'Ação Cívica',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/The_flag_of_Cape_Verde_Islands_in_the_city_center.jpg',
    paragraphs: [
      'No âmbito das comemorações do Dia da Defesa Nacional, as Forças Armadas de Cabo Verde realizaram uma Feira de Saúde na Rua Pedonal do Plateau, Cidade da Praia, que reuniu dezenas de cidadãos.',
      'A iniciativa mobilizou profissionais de saúde do Serviço de Saúde Militar e contou com rastreios gratuitos, aconselhamento médico e atividades de sensibilização para a comunidade, reforçando a ligação entre as Forças Armadas e a população civil.',
      'Esta ação de cariz cívico-militar integra-se numa série de iniciativas que a instituição tem vindo a desenvolver para aproximar-se ainda mais da sociedade cabo-verdiana.'
    ]
  },
  'reconhecimento-fuzileiro': {
    title: 'Sargento Fuzileiro Nabil Sandro Medina Camará distinguido em curso na Marinha Portuguesa',
    date: '12 de novembro de 2025', tag: 'Reconhecimento',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Cape_Verde_Coast_Guard_patrol_vessel_Guardi%C3%A3o_(P511)_moored_in_Mindelo_on_9_August_2019_190809-N-UN744-0063.jpg',
    paragraphs: [
      'O Sargento Fuzileiro Nabil Sandro Medina Camará, das Forças Armadas de Cabo Verde, concluiu com elevado mérito o Curso de Formação de Oficiais Fuzileiros na Marinha Portuguesa, tendo sido distinguido com quatro Diplomas de Prémio.',
      'Os prémios reconhecem a sua excelência profissional, condição física e comportamento exemplar ao longo do curso, destacando-se entre os demais formandos de diferentes nacionalidades.',
      'Este reconhecimento reflete o nível de preparação dos militares cabo-verdianos em formações internacionais e reforça os laços de cooperação técnico-militar entre Cabo Verde e Portugal.'
    ]
  },
  'exercicio-busca-salvamento': {
    title: 'Forças Armadas participam em exercício conjunto de busca e salvamento marítimo',
    date: '20 de outubro de 2025', tag: 'Operações',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Cape_Verde_Coast_Guard_patrol_vessel_Guardi%C3%A3o_(P511)_moored_in_Mindelo_on_9_August_2019_190809-N-UN744-0063.jpg',
    paragraphs: [
      'As Forças Armadas de Cabo Verde, através da Guarda Costeira, participaram num exercício conjunto de busca e salvamento marítimo ao largo da Cidade da Praia, em articulação com a Proteção Civil e parceiros internacionais.',
      'O exercício visou testar a capacidade de resposta rápida a situações de emergência no mar, incluindo simulações de resgate de embarcações em dificuldade e coordenação entre diferentes entidades de socorro.',
      'Este tipo de treino conjunto é fundamental para reforçar a prontidão operacional da Guarda Costeira na sua missão de segurança marítima na Zona Económica Exclusiva de Cabo Verde.'
    ]
  },
  'escola-militar-nova-turma': {
    title: 'Escola Militar recebe nova turma de candidatos a Oficiais',
    date: '05 de outubro de 2025', tag: 'Formação',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Kanonen_vor_Kaserne_Quartel_Jaime_Mota_Plato_Praia,_Santiago.JPG',
    paragraphs: [
      'A Escola Militar de Cabo Verde recebeu uma nova turma de candidatos a Oficiais, numa cerimónia de abertura do ano letivo que contou com a presença do Chefe do Estado-Maior das Forças Armadas e de outras entidades militares.',
      'Os novos candidatos iniciam um percurso de formação académica e militar que os preparará para assumir funções de comando e liderança nas diferentes componentes das Forças Armadas.',
      'A formação de Oficiais é um pilar fundamental para garantir a qualidade e continuidade da liderança institucional ao longo dos próximos anos.'
    ]
  }
};
