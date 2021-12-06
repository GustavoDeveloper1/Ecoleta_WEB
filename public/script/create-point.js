

function populationUFs() {
    const ufSelect = document.querySelector("select[name=uf]");
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(states => {
            for (const state of states) {
                ufSelect.innerHTML += `<option value = "${state.id}">${state.nome}</option>`
            }

        })
}


populationUFs()
/*pegando as cidades */
function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")

    const stateinput = document.querySelector("input[name=state]")


    const ufvalue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateinput.value = event.target.options[indexOfSelectedState].text
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufvalue}/municipios`

    citySelect.innerHTML = ""
    citySelect.disabled = true;
    fetch(url)
        .then(res => res.json())
        .then(cities => {

            for (const city of cities) {
                citySelect.innerHTML += `<option value = "${city.id}">${city.nome}</option>`
            }

            citySelect.disabled = false;
        })
}

document.querySelector("select[name=uf]").addEventListener("change", getCities);

/* Itens de coleta*/
const itensToCollet = document.querySelectorAll(".itens-grid li")

for (const item of itensToCollet) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItens = []
function handleSelectedItem(event) {
    const itemLi = event.target

    /*adicionar ou remover uma class */
    itemLi.classList.toggle("selected")/**O toggle vai adicionar ou remover a class */
    const itemId = itemLi.dataset.id

    const arreadySelected = selectedItens.findIndex(item => {
        const itemFound = item == itemId
        return itemFound;
    })

    if (arreadySelected >= 0) {
        //tirar da seleção

        const filteredItems = selectedItens.filter(item => {
            const itemIsDiferent = item != itemId
            return itemIsDiferent
        })
        selectedItens = filteredItems
    } else {
        selectedItens.push(itemId)/*coloca o elemento dentro do array */
    }

    collectedItems.value = selectedItens
    /*
        *Verificar se existe items selecionados
     *  se sim pegar os itens selecionados
     * e se ja estiver selecionado, tirar a seleção
        *att o campo com os dados
     */


}