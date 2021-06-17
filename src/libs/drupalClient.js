/**
 * per fetchare le route dinamiche di struttura per menu e submenu
 * @returns {Array} array che contiene la struttura del menu per costruire routes in main.js
 */
 export function fetchRoutes() {
    return fetch(`${process.env.VUE_APP_ENDPOINT}/json/front-routes`)
      .then(res => res.json())
      .then(json => {
        return json.data
      })
  }
  
  /**
   * per fetchare un content type, con opzioni di filtro e campi esterni da includere (es. immagini collegate)
   * 
   * @param {String} nodeName
   * @param {Object} options
   * @param {String[]} options.include    array di stringhe dei campi da includere (deve esistere la relazione)
   * @param {Object[]} options.filters    array di oggetti filtro: {key:"campofiltro", value:"valore"}
   * @returns {Promise}                   ritorna una promise ~ una funzione la cui risposta deve essere attesa al momento della chiamata
   */
   export function fetchNodes(nodeName, options) {
    //url api per il content type scelto
    let url = new URL(`${process.env.VUE_APP_ENDPOINT}/jsonapi/node/${nodeName}`);
  
    /**
     * se esistono dei filtri li aggiunge alla query di jsonAPI,
     * ed esclude dal jsonAPI finale i content type che non appartengono alle condizioni
     */
    if (options && Array.isArray(options.filters)) {
      options.filters.forEach((filter) => {
        url.searchParams.append("filter[" + filter.key + "]", filter.value);
      });
    }
    
    /**
     * se vengono richiesti dei campi da includere, li aggiunge alla query di jsonAPI
     * sono campi di altre tabelle, collegati al content type tramite una "relationship" nel DB
     * per esempio, se un content type è collegato ad un'immagine, questa sarà presente solo tramite (n)ID nella tabella:
     * aggiungendola nella richiesta della query, il jsonAPI restituito avrà anche il campo esterno con la sua url e altri dati
     * 
     * con "includes" si includono i campi del riferimento all'oggetto esterno, non i suoi dati completi
     * nel caso di un'immagine bastano quelli (dato che contengono la sua uri per poterla visualizzare),
     * ma nel caso di un'entità più complessa va fatto un fetch sulla tabella corrispondente (non incluso qui)
     */ 
    if (options && Array.isArray(options.include)) {
      url.searchParams.append("include", options.include.join(","));
    }
  
    //console.log(url)
  
    return fetch(url)
      .then((res) => res.json())
      .then((json) => {
        //restituisce il jsonAPI
        let nodes = json.data;
  
        //se erano presenti dei campi esterni da includere, li incorpora nel risultato finale senza doverli cercare nel jsonAPI
        if (options.include) {
          let included = json.included;
          nodes = addIncludedFields(nodes, included, options.include);
        }
        return nodes;
      });
  }
  
  export function fetchSingleNode(contentType, nodeId, options) {
    let url = new URL(`${process.env.VUE_APP_ENDPOINT}/jsonapi/node/${contentType}/${nodeId}`);
    if (options && Array.isArray(options.filter)) {
      options.filters.forEach((filter) => {
        url.searchParams.append("filter[" + filter.key + "]", filter.value);
      });
    }
    if (options && Array.isArray(options.include)) {
      url.searchParams.append("include", options.include.join(","));
    }
    return fetch(url)
      .then((res) => res.json())
      .then((json) => {
        //console.log(json)
        let nodes = json.data;
        if (options.include) {
          let included = json.included;
          nodes = addIncludedFields(nodes, included, options.include);
        }
        return nodes;
      });
  }
  
  /**
   * aggiunge al singolo item i campi dell'array included (matching dei campi richiesti)
   * serve perchè i campi inclusi nella query sono a livello globale di content type
   * (se richiedo di includere le immagini per una news, includerà tutte le immagini di tutte le news,
   * per selezionarle devo fare un matching degli id corrispondenti nelle relationships)
   *
   * @param {Array} items       dati principali del content type scelto
   * @param {Array} included    dati esterni fetchati dal DB
   * @param {Array} fieldNames  array dei nomi dei campi da matchare e inserire nel jsonAPI principale
   * @returns {Array}           jsonAPI finale
   */
  export function addIncludedFields(items, included, fieldNames) {
    //per ogni oggetto
    return items.map((item) => {
      //scorri i nomi dei campi esterni scelti
      fieldNames.forEach((fieldName) => {
        //se esiste quella relazione per l'oggetto corrente...
        if (item.relationships[fieldName].data) {
          //...e se i dati sono dentro un array (più di uno)
          if (Array.isArray(item.relationships[fieldName].data)) {
            //copia tutti i dati esterni che hanno la stessa foreign key di riferimento nell'oggetto corrente
            item[fieldName] = item.relationships[fieldName].data.map(
              (relationshipItem) => {
                return included.find((includedItem) => {
                  return includedItem.id === relationshipItem.id;
                });
              }
            );
          //...altrimenti copia il valore se ha la stessa foreign key
          } else if (item.relationships[fieldName].data.id) {
            item[fieldName] = included.find((includedItem) => {
              return includedItem.id === item.relationships[fieldName].data.id;
            });
          }
        }
      });
      return item;
    });
  }