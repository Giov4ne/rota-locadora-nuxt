<template>
    <div class="dropdown custom-dropbox">
        <label><!--Propósito de uso-->Tipo de negociação</label>
        <button @click="purposesToggleDropdown" class="dropdown-button">
            <span v-if="localSelectedPurpose === ''" class="dropdown-text">
                <!-- Selecione o propósito de uso -->
                 Selecione o tipo de negociação
            </span>
            <span v-else class="dropdown-selected">
                <span class="dropdown-selected-text">
                    {{ localSelectedPurpose }}
                </span>
                <span class="close-selected" @click.stop="clearPurposeSelection">x</span>
            </span>
            <span :class="{ 'rotate-up': purposesIsOpen }" class="arrow">
                &#9660;
            </span>
        </button>
        <transition name="fade">
            <div v-if="purposesIsOpen" class="dropdown-menu">
                <label class="dropdown-menu-title"><!--Propósito de uso-->Tipo</label>
                <hr>
                <div class="dropdown-menu-content-purpose">
                    <ul>
                        <li v-for="purpose in purposesOfUse" :key="purpose.value" @click="selectPurposeOption(purpose)">
                            {{ purpose.label }}    
                        </li>
                    </ul>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default{
        name: 'PurposesDropdown',
        props: {
            modelValue: String
        },
        data(){
            return{
                purposesIsOpen: false,
                localSelectedPurpose: this.modelValue || '',
                purposesOfUse: [
                    // { label: "Uso pessoal", value: "personal-use" },
                    // { label: "Veículo para locação", value: "vehicle-for-rent" },
                    // { label: "Uso da empresa", value: "company-use" }
                    { label: "APP", value: "APP" },
                    { label: "Comodato", value: "comodato" }
                ]
            }
        },
        methods:{    
            purposesToggleDropdown(){
                this.purposesIsOpen = !this.purposesIsOpen;
            },

            selectPurposeOption(purpose){
                this.localSelectedPurpose = purpose.label;
                this.purposesIsOpen = false;
                this.$emit("input", purpose.value);
            },

            clearPurposeSelection(){
                this.localSelectedPurpose = '';
                this.$emit("input", '');
            }
        }
    }
</script>

<style>

</style>