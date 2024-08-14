<template>
  <div>
    <h1>Registrar tramites</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="tipoTramite">Tipo Tramite:</label>
        <select id="tipoTramite" v-model="form.tipoTramiteId" :class="{ 'is-invalid': errors.tipoTramiteId }">
          <option :value="tipoTramite.id" v-for="(tipoTramite, index) in tipoTramiteList" :key="`tipoTramite-${index}`">{{ tipoTramite.nombre }}
          </option>
        </select>
        <div v-if="errors.tipoTramiteId" class="invalid-feedback">{{ errors.tipoTramiteId }}</div>
      </div>

      <div class="form-group">
        <label for="nroTramite">Nro. Trámite:</label>
        <input type="text" id="nroTramite" v-model="form.nroTramite" :class="{ 'is-invalid': errors.nroTramite }"
          placeholder="Ingrese el Número de trámite" />
        <div v-if="errors.nroTramite" class="invalid-feedback">{{ errors.nroTramite }}</div>
      </div>

      <div class="form-group">
        <label for="fechaIngreso">Fecha de Ingreso:</label>
        <input type="date" id="fechaIngreso" v-model="form.fechaIngreso" placeholder="Ingrese la fecha" :class="{ 'is-invalid': errors.fechaIngreso }" />
        <div v-if="errors.fechaIngreso" class="invalid-feedback">{{ errors.fechaIngreso }}</div>
      </div>

      <input type="hidden" v-model="form.estado" />

      <button type="submit" class="btn btn-primary">Registrar</button>
    </form>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import VueDatePicker from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css'

  const date = ref();
</script>
  
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: 'MascotaNew',
  data() {
    return {
      tipoTramiteList: [],
      form: {
        nroTramite: '',
        fechaIngreso: '',
        estado: 'AC',
        tipoTramiteId: null
      },
      errors: {}
    };
  },
  methods: {
    ...mapActions(['increment']),
    validateForm() {
      this.errors = {};

      if (!this.form.tipoTramiteId) {
        this.errors.tipoTramiteId = 'El Tipo de trámite es obligatorio.';
      }

      if (!this.form.nroTramite) {
        this.errors.nroTramite = 'El número de trámite es obligatoria.';
      }

      if (!this.form.fechaIngreso) {
        this.errors.fechaIngreso = 'La fecha de ingreso es obligatoria.';
      }

      return Object.keys(this.errors).length === 0;
    },

    submitForm() {
      if (this.validateForm()) {
        // Enviar los datos al servidor
        this.save();
        // Reiniciar el formulario
        this.form = {
          nroTramite: '',
          fechaIngreso: '',
          estado: '',
          tipoTramiteId: null
        };
      }
    },
    save() {
      const vm = this;
      this.axios.post(this.baseUrl + "/tramites", this.form)
        .then(function (response) {
          if (response.status == '201') {
            vm.$emit('on-register', response.data);
          }
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
  },
  computed: {
    // propiedades computadas que dependen de otras propiedades reactivas
    ...mapState(['count']),
    ...mapGetters(['doubleCount', 'getBaseUrl']),
    baseUrl() {
      return this.getBaseUrl
    }
  },
  mounted() {
    this.getTipoTramiteList();
  },
}
</script>
  
<style scoped></style>
  