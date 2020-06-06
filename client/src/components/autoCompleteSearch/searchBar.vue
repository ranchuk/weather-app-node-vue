<template>
    <div class="search">
        <input class="input" type="text" v-bind:value="inputValue" @input="inputChange" v-on:focus="showDDL" v-on:blur="HideDDLWithDelay"  >
        <CitiesList v-if="isVisible" v-bind:cities="cities" v-on:city-selected="setInput($event,true)" />
    </div>
</template>

<script>
import CitiesList from './citiesList'
import * as _ from 'lodash';
import axios from 'axios';

export default {
  name: 'SearchBar',
  data() {
      return {
          inputValue: '',
          cities: [],
          isVisible: false
      }
  },
  components: {
      CitiesList
  },
  methods: {
      autoComplete: _.debounce(async function(query) {
                                if(query!== '') {
                                    const res = await axios.get(`http://127.0.0.1:5000/autoCompleteSearch?query=${query}`)
                                    this.cities = res.data.data
                                }
                    },500),
      async inputChange(e){
        const query= e.target.value
        if(query === '') {
            this.autoComplete(query) // call this with empty search query to prevent the debounced method to search last word while deleting all input
            this.setInput('')
            this.hideDDL();
        }

        else if(/^[a-zA-Z\s]+$/.test(query)){
                this.setInput(query)
                this.autoComplete(query)
        }
      },
      setInput(value,isSelected){
          this.inputValue = value;
          isSelected ? this.hideDDL(): this.showDDL()
      },
      hideDDL(){
           this.isVisible = false // to close the drop down on select
      },
      HideDDLWithDelay(){ // when clicking outside the DDL (onblur) but if clicked on city item, we still want to catch the "selected city event" so we delay
          setTimeout(()=>{
              this.hideDDL();
          },100)
      },
      showDDL(){
        this.isVisible = true  
      }
  }
}
</script>

<style scoped>
.search {
    z-index: 3;
    color:black;
    /* @media screen 
            and (max-device-width: 580px) 
            and (-webkit-min-device-pixel-ratio: 1) { 
                top:150%;
    } */
}
.input {
    border: 1px solid black;
    border-radius: 3px;
    font-size: 2rem;
    padding: 1rem;
    background-color: white;
}

</style>
