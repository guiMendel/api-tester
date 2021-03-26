<template>
  <curtain-view
    title="Add a New User"
    :buttons="[
      {
        iconName: 'send',
        color: ['var(--green)', 'white'],
        action: submitUser,
      },
    ]"
  >
    <form @submit="submitUser">
      <em
        >The form can be submited however you like, so that you can test the
        API's response to bad requests</em
      >

      <form-field
        v-for="(data, field) in inputFields"
        :key="field"
        :name="field"
        :check-for-error="errorChecker(field)"
        :target="data"
      />
    </form>
  </curtain-view>
</template>

<script>
import CurtainView from "../components/generic/CurtainView.vue";
import FormField from "../components/FormField.vue";
import api from "../helpers/api";
import { mapMutations } from "vuex";

export default {
  name: "NewUser",
  components: {
    CurtainView,
    FormField,
  },
  data: () => ({
    inputFields: {
      name: { value: "" },
      nickname: {
        value: "",
        tip: "Your nickname is how other users will be able to look you up!",
      },
      age: { value: "", type: "number" },
      password: { value: "", type: "password" },
      email: { value: "", type: "email" },
    },
  }),
  methods: {
    ...mapMutations(["pushUser"]),
    // Retorna uma funcao que verifica se um texto eh valido ou nao. A funcao retornada depende de qual campo foi selecionado
    errorChecker(field) {
      const field_handlers = {
        name(value) {
          // IMPLEMENTAR checagem se eh unico
          return "";
        },
        nickname(value) {
          // IMPLEMENTAR checagem se eh unico
          return "";
        },
        age: (value) => (value >= 18 ? "" : "User must be 18 or older"),
        password: (value) =>
          value.length >= 6
            ? ""
            : "Password must be at least 6 characters long",
        // IMPLEMENTAR checagem se eh unico no email
        email: (value) => (value.match(/.@./) ? "" : "Invalid email address"),
      };

      const handler = field_handlers[field];

      if (!handler) {
        console.error(
          `No such field as "${field}" was declared in the NewUser component's errorChecker field_handlers`
        );
        return () => "";
      }

      return handler;
    },
    // faz a solicitacao de criar usuario para a API
    submitUser(event) {
      // se recebeu um evento impede a pagina de recarregar
      event?.preventDefault();

      this.$toast.show("Sending new user request...");
      api
        .createUser({
          name: this.inputFields.name.value,
          nickname: this.inputFields.nickname.value,
          password: this.inputFields.password.value,
          age: this.inputFields.age.value,
          email: this.inputFields.email.value,
        })
        .then((response) => {
          this.$toast.success(
            `Successfully created user ${response.data.user.name}`
          );
          this.pushUser(response.data.user);
        })
        .catch((error) => {
          this.$toast.error(`Invalid user. Check the API log for details`);
        });
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;

  align-items: flex-start;
}
</style>