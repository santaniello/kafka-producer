
const kafka = require('kafka-node');
const bp = require('body-parser');
const config = require('./config');

try {
  const Producer = kafka.Producer;
  const client = new kafka.Client(config.kafka_server);
  const producer = new Producer(client);
  const kafka_topic = 'example';
  console.log(kafka_topic);
let teste = JSON.parse('{"RULEID":"60850","NAME":"FreteGrátis_SP","DATAINICIAL":"12/06/13","DATAFINAL":"","LOJISTA":"NCMP_10030","LAST_UPDATE":"07/04/16 05:32:14,000000","TIPO":"Benefício","IDTIPO":"91","DESCATRIBUTO":"Desconto","IDOPERACAO":"20","DESCOPERACAO":"igual a","OPERACAO":"==","VALUE":"100"}');

let payloads = [
   {
    topic: kafka_topic,
    messages: '{"RULEID":"60850","NAME":"FreteGrátis_SP","DATAINICIAL":"12/06/13","DATAFINAL":"","LOJISTA":"NCMP_10030","LAST_UPDATE":"07/04/16 05:32:14,000000","TIPO":"Benefício","IDTIPO":"91","DESCATRIBUTO":"Desconto","IDOPERACAO":"20","DESCOPERACAO":"igual a","OPERACAO":"==","VALUE":"100"}'
   }
];

  console.log(payloads)

  producer.on('ready', async function() {
    let push_status = producer.send(payloads, (err, data) => {
      if (err) {
        console.log('[kafka-producer -> '+kafka_topic+']: broker update failed');
      } else {
        console.log('[kafka-producer -> '+kafka_topic+']: broker update success');
      }
    });
  });

  producer.on('error', function(err) {
    console.log(err);
    console.log('[kafka-producer -> '+kafka_topic+']: connection errored');
    throw err;
  });
}
catch(e) {
  console.log(e);
}
