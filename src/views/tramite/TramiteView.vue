<template>
    <div>
        <Modal v-model:modelValue="showModalNuevo">
            <TramiteNew @on-register="onRegister($event)"/>
        </Modal>
        <Modal v-model:modelValue="showModalEdit">
            <TramiteEdit @on-update="onUpdate($event)" :item="itemToEdit"/>
        </Modal>
        <h1>Lista de Trámites</h1>
        <button @click="showModalNuevo = true" class="btn btn-primary">Nuevo</button>
        <button @click="buscar()" class="btn btn-lith" style="float:right">Buscar</button>
        <input type="search" style="float:right" v-model="textToSearch" @search="buscar()">
        <div style="margin: 20px 0;">
            <h3>Filtros:</h3>
            <form @submit.prevent="filtrar()">

                <label for="fecha"> Fecha: </label>
                <input type="date" id="fecha" v-model="filter.fecha" placeholder="Ingrese la fecha" />

                <label for="tipoTramite"> Tipo Trámite: </label>
                <select id="tipoTramite" v-model="filter.tipoTramiteId">
                    <option value="">Todos</option>
                    <option :value="tipoTramite.id" v-for="(tipoTramite, index) in tipoTramiteList" :key="`tipoTramite-${index}`">{{ tipoTramite.nombre }}
                    </option>
                  </select>
                <button type="submit" class="btn btn-lith">Filtrar</button>
            </form>
        </div>
        <table>
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Tipo Trámite</th>
                    <th>Nro. Trámite</th>
                    <th>Fecha Ingreso</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in itemList" :key="index">
                    <td>{{ 1 + index }}</td>
                    <td>{{ item.tipoTramite.nombre }}</td>
                    <td>{{ item.nroTramite }}</td>
                    <td>{{ item.fechaIngreso }}</td>
                    <td>
                        <button @click="irTrazas(item.id)" class="btn btn-info" style="margin-right: 15px;">Trazas</button>
                        <button @click="edit(item)" class="btn btn-dark" style="margin-right: 15px;">Editar</button>
                        <button @click="eliminar(item.id)" class="btn btn-danger">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
  
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import Modal from '../../components/Modal.vue'
import TramiteNew from './TramiteNewView.vue'
import TramiteEdit from './TramiteEditView.vue'


export default {
    name: 'Tramite',
    data() {
        return {
            currentPage: 1,
            totalPages: 100, // Este valor debe ser calculado según tus datos
            showModalNuevo: false,
            showModalEdit: false,
            itemToEdit: null,
            textToSearch: '',
            textToFilter: '',
            itemList: [],
            tipoTramiteList: [],
            filter: {
                fecha: null,
                tipoTramiteId:''
            }
        }
    },
    components: {
        // Registro de componentes que se utilizaran.
        Modal,
        TramiteNew,
        TramiteEdit
    },
    methods: {
        // métodos que se pueden llamar desde la plantilla o desde otras partes del componente.
        ...mapActions(['increment']),
        getList() {
            const vm = this;
            this.axios.get(this.baseUrl + "/tramites?_expand=tipoTramite" + this.textToFilter + "&q=" + this.textToSearch)
                .then(function (response) {
                    vm.itemList = response.data;
                })
                .catch(function (error) {
                    console.error(error);
                });
        },
        getTipoTramiteList() {
            const vm = this;
            this.axios.get(this.baseUrl + "/tipoTramites")
                .then(function (response) {
                    vm.tipoTramiteList = response.data;
                })
                .catch(function (error) {
                    console.error(error);
                });
        },
        irTrazas(id){
            this.$router.push("/tramite/"+id+"/trazas");
        },
        edit(item) {
            this.itemToEdit = Object.assign({}, item);
            this.showModalEdit = true;
        },
        eliminar(id) {
            if (confirm("¿Esta Seguro de eliminar el registro?")) {
                const vm = this;
                this.axios.delete(this.baseUrl + "/tramites/" + id)
                    .then(function (response) {
                        vm.getList();
                        vm.$toast.show("Registro eliminado.", "danger");
                    })
                    .catch(function (error) {
                        console.error(error);
                    });
            }

        },
        buscar() {
            this.getList();
        },
        onRegister(event) {
            this.getList();
            this.showModalNuevo = false;
            this.$toast.show('Registro exitoso', 'success');
        },
        onUpdate(event) {
            this.getList();
            this.showModalEdit = false;
            this.itemToEdit = null;
            this.$toast.show('Edicion exitosa', 'info');
        },
        showToast(message, type) {
            this.$toast.show(message, type);
        },
        filtrar() {
            this.textToFilter = '';
            if (this.filter.fecha != null && this.filter.fecha != '') {
                this.textToFilter += "&fechaIngreso=" + this.filter.fecha;
            }
            if (this.filter.tipoTramiteId != null && this.filter.tipoTramiteId != '') {
                this.textToFilter += "&tipoTramiteId=" + this.filter.tipoTramiteId;
            }
            this.getList();
        },
    },
    computed: {
        // propiedades computadas que dependen de otras propiedades reactivas
        ...mapState(['count']),
        ...mapGetters(['doubleCount', 'getBaseUrl']),
        baseUrl() {
            return this.getBaseUrl
        }
    },
    props: {
        // propiedades que el componente puede recibir.
    },
    mounted() {
        this.getList();
        this.getTipoTramiteList();
    },
    emits: [] // los eventos personalizados que el componente puede emitir.
}
</script>
  
<style></style>