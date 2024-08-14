<template>
    <div v-if="tramiteDatos">
      <h1>Seguimiento de trámite {{tramiteId}}</h1>
      <div>
        <h2>Información del Trámite</h2>
        <p>Número trámite: {{ tramiteDatos?.nroTramite }}</p>
        <p>Tipo trámite: {{ tramiteDatos.tipoTramite.nombre }}</p>
        <p>Fecha ingreso: {{ tramiteDatos.fechaIngreso }}</p>
      </div>
      <div>
        <h2>Traza del trámite</h2>
        <table>
          <thead>
            <tr>
              <th>Unidad</th>
              <th>Fecha de recepción</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="traza in listaTrazas" :key="traza.id">
              <td>{{ traza.unidad }}</td>
              <td>{{ traza.fechaRecepcion }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
</template>
  
  <script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  export default {
    name: 'TramiteTrazasView',
    data() {
      return {
        tramiteDatos: null,
        listaTrazas:[]
      };
    },
    methods: {
      getTramite(){
        const tramiteId = this.$route.params.id;
        const vm = this;
        this.axios.get(this.getBaseUrl+"/tramites/" + tramiteId + "?_expand=tipoTramite")
        .then(function(response){
          vm.tramiteDatos = response.data;
        })
        .catch(function(error){
          console.error(error);
        })
      },
      getTramiteTrazaList(){
        const tramiteId = this.$route.params.id;
        const vm = this;
        this.axios.get(this.getBaseUrl+"/tramiteTrazas?_expand=tramite&tramiteId=" + tramiteId)
        .then(function(response){
          vm.listaTrazas = response.data;
        })
        .catch(function(error){
          console.error(error);
        })
      }
    },
    computed: {
      ...mapGetters(['getBaseUrl']),
        tramiteId() {
        // Recupera el parámetro de ruta 'id'
        return this.$route.params.id;
      }
    },
    mounted(){
      this.getTramite();
      this.getTramiteTrazaList();
    }
  };
  </script>
  
  <style></style>
  