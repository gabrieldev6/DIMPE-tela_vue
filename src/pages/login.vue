<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { ref, watchEffect } from 'vue'
import logo from '../assets/logoDrone.svg'

import logo1 from "../assets/logoDimpe.svg"

import { GoogleLogin, decodeCredential } from 'vue3-google-login';
import api from '../service/api.ts'

import { userData } from '../types/user'
import router from '../router';

import Modal from "../components/modal/modal.vue";

library.add(fas);

let email = ref<string>('')
let senha = ref<string>('')
let campoNull = ref<boolean>(false)
let showModalSecurity = ref<boolean>(false)
let showModalPrivacy = ref<boolean>(false)
let showModalCode = ref<boolean>(false)
let showModalRecoverEmail = ref<boolean>(false)
watchEffect(() => {
    console.log(showModalSecurity.value)
})

// login feito pelo backend
let submit = async () => {

    // valida se os campos nao estao vazios
    if (email.value != '' && senha.value != '') {
        api.post("/login", {
            email: email.value,
            senha: senha.value

        }).then((response: any) => {

            if (response.status == 200) {

                router.push({ name: 'dashboard', query: { nome: response.data.user.nome, token: response.data.token } })

            } else {

                response.value = true
            }
            console.log(response.data)


        })
        // se estiver vazio vai gerar um alerta
    } else {
        campoNull.value = true
    }


}
// pega os dados de nome, token e foto do usario que logou com a conta do google
const validacao = (response: any) => {

    if (response.credential != null) {
        //usa esse tipo para pegar as informações principais necessarias
        const userData = decodeCredential(response.credential) as userData

        // joga para tela de dashboard as informações do usuario pela barra de navegação
        router.push({
            name: 'dashboard',
            query: {
                nome: userData.given_name,
                token: response.credential,
            }

        })
    }
}

</script>

<template>
    <div class="w-full h-full flex justify-center items-center text-center bg-gray-200 dark:bg-gray-900">

        <div class="bg-white w-full h-full 2xl:max-w-1800px sm:flex dark:bg-gray-900">
            <div class="w-70%  shadow-xl shadow-gray-400 dark:shadow-black hidden sm:block z-100 ">
                <!--  -->
                <div class="w-full h-95% justify-around items-center bg-gray-700">
                    <div class="h-25% flex justify-start ">
                        <ul class="list-none pl-40">
                            <li class="flex justify-end">
                                <img :src="logo" alt="imagem meramente ilustrativa" class="rastro w-50px h-50px ">
                                <img :src="logo" alt="imagem meramente ilustrativa" class="rastro w-50px h-50px ">
                                <img :src="logo" alt="imagem meramente ilustrativa" class="rastro w-50px h-50px ">
                            </li>
                            <li class="flex justify-end">
                                <img :src="logo" alt="imagem meramente ilustrativa" class="rastro w-50px h-50px">
                                <img :src="logo" alt="imagem meramente ilustrativa" class="rastro w-50px h-50px">
                            </li>
                            <li class="flex justify-end">
                                <img :src="logo" alt="imagem meramente ilustrativa" class="rastro w-50px h-50px">

                            </li>
                        </ul>
                    </div>

                    <div class="w-full h-50% flex items-center justify-around">


                        <img :src="logo" alt="imagem meramente ilustrativa" class="w-40 h-40 ">
                        <h1 class="color-white">Olá, seja bem vindo ao futuro!</h1>
                    </div>
                    <div class="flex justify-end h-25%">
                        <ul class="list-none pr-40">
                            <li class="flex justify-start">
                                <img :src="logo" alt="imagem meramente ilustrativa" class="rastro w-50px h-50px ">

                            </li>
                            <li class="flex justify-start">
                                <img :src="logo" alt="imagem meramente ilustrativa" class="rastro w-50px h-50px">
                                <img :src="logo" alt="imagem meramente ilustrativa" class="rastro w-50px h-50px">
                            </li>
                            <li class="flex justify-start">
                                <img :src="logo" alt="imagem meramente ilustrativa" class="rastro w-50px h-50px">
                                <img :src="logo" alt="imagem meramente ilustrativa" class="rastro w-50px h-50px ">
                                <img :src="logo" alt="imagem meramente ilustrativa" class="rastro w-50px h-50px ">

                            </li>

                        </ul>
                    </div>
                </div>

                <button class="w-full h-5% hover:bg-gray-300">O que é Dimpe?</button>
            </div>

            <div class="px-10 h-90% py-5 sm:w-30% dark:bg-gray-900 dark:color-white">
                <div class="w-full h-95%">

                    <img :src="logo1" alt="logo" class="w-150px mt-8 2xl:w-250px">
                    <div class="w-full flex justify-start">
                        <h2 class="mt-12 font-normal dark:color-gray">Entrar</h2>
                    </div>


                    <div
                        class="bg-white w-full mt-3 rounded-1 shadow flex items-center text-center text-gray dark:bg-gray-800 dark:color-gray">
                        <FontAwesomeIcon icon="fa-solid fa-envelope" class="p-2"></FontAwesomeIcon>
                        <input v-model="email" type="Email" placeholder="Email"
                            class="p-4 w-full rounded-1 text-4 font-bold dark:bg-gray-800 dark:color-gray">

                    </div>
                    <div
                        class="bg-white w-full mt-3 rounded-1 shadow flex items-center text-center text-gray dark:bg-gray-800 dark:color-gray">
                        <FontAwesomeIcon icon="fa-solid fa-lock" class="p-2"></FontAwesomeIcon>
                        <input v-model="senha" type="password" placeholder="Senha"
                            class="p-4 w-full rounded-1  text-4 font-bold dark:bg-gray-800 dark:color-gray">

                    </div>

                    <h5 v-if="campoNull" class="text-red mt-3">Um ou mais campos estão vazios</h5>

                    <button @click="submit"
                        class=" shadow w-full mt-10 p-4 hover:bg-blue-500 text-white bg-blue rounded-1 ">
                        <h3>Entrar</h3>
                    </button>

                    <div class="flex justify-between py-8 mx-2">

                        
                            <h3 @click="showModalRecoverEmail=!showModalRecoverEmail" class="color-black font-normal dark:color-gray cursor-pointer">Esqueceu a senha?</h3>
                        
                        <router-link :to="{ name: 'newAccount' }" class="no-underline">
                            <h3 class="color-black font-normal dark:color-gray">Criar conta</h3>
                        </router-link>
                    </div>

                    <GoogleLogin :callback="validacao"></GoogleLogin>


                </div>
                <div class="flex w-full justify-center dark:bg-gray-900 dark:color-gray">
                    <span class="text-3">Versão 0.0.1</span>
                </div>
                <div class="flex w-full justify-center dark:color-gray">
                    <span class="text-3">Copyright © 2024 - DIMPE - Todos os direitos reservados</span>
                </div>
                <div class="w-full flex justify-around pt-2 dark:bg-gray-900 dark:color-gray">
                    <button @click="showModalSecurity = !showModalSecurity"
                        class="text-3 bg-white cursor-pointer  dark:color-gray dark:bg-gray-900">Segurança da
                        Informação</button>
                    <button @click="showModalPrivacy = !showModalPrivacy"
                        class="text-3 bg-white cursor-pointer dark:color-gray dark:bg-gray-900 ">Politica de
                        Privacidade</button>
                    <button @click="showModalCode = !showModalCode"
                        class="text-3 bg-white cursor-pointer dark:color-gray dark:bg-gray-900 ">Código de
                        Ética</button>
                </div>
            </div>

        </div>
        <Modal label="Esqueceu a senha?" :show=showModalRecoverEmail>
            <div class="w-full mx-5">
                <h4 class="flex">Nós enviaremos um email com um link para você alterar a senha</h4>
            

                <div
                    class="bg-white mt-2 w-full rounded-1 shadow flex items-center text-center text-gray dark:bg-gray-800 dark:color-gray">
                    <FontAwesomeIcon icon="fa-solid fa-envelope" class="p-2"></FontAwesomeIcon>
                    <input type="Email" placeholder="Email"
                        class="p-4 w-full rounded-1 text-4 font-bold  dark:bg-gray-800 dark:color-gray">

                </div>
                <div class="w-full flex justify-right mt-2">
                    <button @click="showModalRecoverEmail=!showModalRecoverEmail"
                    class="w-100px h-40px shadow  flex items-center justify-center p-2 mx-5px text-black hover:bg-gray-100 bg-white rounded-1 dark:bg-gray-800 dark:color-gray dark:hover:bg-gray-700">
                    <h4>Cancelar</h4>
                </button>
                <button @click=""
                    class="  w-100px h-40px shadow mx-5px p-2 hover:bg-blue-500 text-white bg-blue rounded-1 ">
                    <h4>Enviar</h4>
                </button>
                </div>
                
            
            </div>
            

        </Modal>
        <Modal label="Segurança da informação" :show=showModalSecurity>
            <ul class="h-500px text-left list-none overflow-y-scroll">
                <li class="pb-2">
                    <h2>Proteção de Dados Pessoais</h2>
                </li>
                <li class="pb-2">
                    <p>Todos os dados pessoais capturados e processados pela aplicação DIMPE, incluindo imagens de
                        indivíduos, devem ser tratados conforme as leis de proteção de dados aplicáveis, como a Lei
                        Geral de Proteção de Dados (LGPD) no Brasil, o Regulamento Geral sobre a Proteção de Dados
                        (GDPR) na União Europeia, ou legislações equivalentes.</p>
                </li>
                <li class="pb-2">
                    <p>Apenas imagens nas quais pessoas foram identificadas serão armazenadas. Dados adicionais como a
                        quantidade de pessoas e suas localizações na imagem também serão registrados.</p>
                </li>
                <li class="pb-2">
                    <h2>Autorização e Consentimento</h2>
                </li>
                <li class="pb-2">
                    <p>A captura de imagens e a identificação de pessoas devem ser realizadas somente em locais e
                        situações em que haja consentimento prévio dos indivíduos ou que estejam de acordo com a
                        legislação aplicável.</p>
                </li>
                <li class="pb-2">
                    <p>Em casos onde o consentimento não é requerido por lei, a aplicação deve fornecer informações
                        claras sobre a coleta e processamento de dados.</p>
                </li>
                <li class="pb-2">
                    <h2>Controle de Acesso</h2>
                </li>
                <li class="pb-2">
                    <p>O acesso às imagens e informações armazenadas na aplicação DIMPE deve ser restrito a indivíduos
                        autorizados.</p>
                </li>
                <li class="pb-2">
                    <p>Implementar autenticação de múltiplos fatores (MFA) para todas as contas de usuários que acessam
                        a aplicação.</p>
                </li>
                <li class="pb-2">
                    <p>Registros de auditoria devem ser mantidos para monitorar o acesso aos dados e garantir que apenas
                        pessoas autorizadas possam visualizar ou manipular informações.</p>
                </li>
                <li class="pb-2">
                    <h2>Armazenamento Seguro</h2>
                </li>
                <li class="pb-2">
                    <p>As imagens e dados relacionados devem ser armazenados em servidores seguros, com mecanismos de
                        criptografia em repouso (at rest) para garantir a confidencialidade.</p>
                </li>
                <li class="pb-2">
                    <p>Os dados sensíveis devem ser encriptados usando padrões de criptografia robustos, como AES-256.
                    </p>
                </li>
                <li class="pb-2">
                    <p>Backups dos dados devem ser realizados regularmente e armazenados de forma segura para prevenir
                        perda de dados.</p>
                </li>

                <li class="pb-2">
                    <h2>Transmissão de Dados Segura</h2>
                </li>
                <li class="pb-2">
                    <p>Toda comunicação entre o drone, a aplicação e os servidores de armazenamento deve ser protegida
                        por criptografia em trânsito (in transit), utilizando protocolos como TLS (Transport Layer
                        Security).</p>
                </li>
                <li class="pb-2">
                    <h2>Retenção e Exclusão de Dados</h2>
                </li>
                <li class="pb-2">
                    <p>Os dados pessoais devem ser armazenados apenas pelo tempo necessário para os fins para os quais
                        foram coletados e processados.</p>
                </li>
                <li class="pb-2">
                    <p>Após o período de retenção ou a pedido do titular dos dados, as imagens e informações associadas
                        devem ser excluídas de forma segura, garantindo que não possam ser recuperadas.</p>
                </li>
                <li class="pb-2">
                    <h2>Prevenção de Acesso Não Autorizado e Incidentes de Segurança</h2>
                </li>
                <li class="pb-2">
                    <p>Implementar firewalls, sistemas de detecção de intrusão (IDS), e sistemas de prevenção de
                        intrusão (IPS) para proteger contra acessos não autorizados e ataques cibernéticos.</p>
                </li>
                <li class="pb-2">
                    <p>Todos os incidentes de segurança devem ser documentados e investigados prontamente, com
                        notificações aos titulares dos dados e autoridades competentes, conforme exigido por lei.</p>
                </li>
                <li class="pb-2">
                    <h2>Treinamento e Conscientização de Usuários</h2>
                </li>
                <li class="pb-2">
                    <p>Todos os usuários e operadores da aplicação DIMPE devem receber treinamento regular sobre
                        práticas de segurança da informação, proteção de dados e privacidade.</p>
                </li>
                <li class="pb-2">
                    <p>Políticas de segurança devem ser revisadas e atualizadas periodicamente para garantir a
                        conformidade com as melhores práticas e requisitos legais.</p>
                </li>
            </ul>

        </Modal>
        <Modal label="Politica de privacidade" :show=showModalPrivacy>
            <ul class="h-500px text-left list-none overflow-y-scroll">
                <li class="pb-2">
                    <h2>Proteção de Dados Pessoais</h2>
                </li>
                <li class="pb-2">
                    <p>Todos os dados pessoais capturados e processados pela aplicação DIMPE, incluindo imagens de
                        indivíduos, devem ser tratados conforme as leis de proteção de dados aplicáveis, como a Lei
                        Geral de Proteção de Dados (LGPD) no Brasil, o Regulamento Geral sobre a Proteção de Dados
                        (GDPR) na União Europeia, ou legislações equivalentes.</p>
                </li>
                <li class="pb-2">
                    <p>Apenas imagens nas quais pessoas foram identificadas serão armazenadas. Dados adicionais como a
                        quantidade de pessoas e suas localizações na imagem também serão registrados.</p>
                </li>
                <li class="pb-2">
                    <h2>Autorização e Consentimento</h2>
                </li>
                <li class="pb-2">
                    <p>A captura de imagens e a identificação de pessoas devem ser realizadas somente em locais e
                        situações em que haja consentimento prévio dos indivíduos ou que estejam de acordo com a
                        legislação aplicável.</p>
                </li>
                <li class="pb-2">
                    <p>Em casos onde o consentimento não é requerido por lei, a aplicação deve fornecer informações
                        claras sobre a coleta e processamento de dados.</p>
                </li>
                <li class="pb-2">
                    <h2>Controle de Acesso</h2>
                </li>
                <li class="pb-2">
                    <p>O acesso às imagens e informações armazenadas na aplicação DIMPE deve ser restrito a indivíduos
                        autorizados.</p>
                </li>
                <li class="pb-2">
                    <p>Implementar autenticação de múltiplos fatores (MFA) para todas as contas de usuários que acessam
                        a aplicação.</p>
                </li>
                <li class="pb-2">
                    <p>Registros de auditoria devem ser mantidos para monitorar o acesso aos dados e garantir que apenas
                        pessoas autorizadas possam visualizar ou manipular informações.</p>
                </li>
                <li class="pb-2">
                    <h2>Armazenamento Seguro</h2>
                </li>
                <li class="pb-2">
                    <p>As imagens e dados relacionados devem ser armazenados em servidores seguros, com mecanismos de
                        criptografia em repouso (at rest) para garantir a confidencialidade.</p>
                </li>
                <li class="pb-2">
                    <p>Os dados sensíveis devem ser encriptados usando padrões de criptografia robustos, como AES-256.
                    </p>
                </li>
                <li class="pb-2">
                    <p>Backups dos dados devem ser realizados regularmente e armazenados de forma segura para prevenir
                        perda de dados.</p>
                </li>

                <li class="pb-2">
                    <h2>Transmissão de Dados Segura</h2>
                </li>
                <li class="pb-2">
                    <p>Toda comunicação entre o drone, a aplicação e os servidores de armazenamento deve ser protegida
                        por criptografia em trânsito (in transit), utilizando protocolos como TLS (Transport Layer
                        Security).</p>
                </li>
                <li class="pb-2">
                    <h2>Retenção e Exclusão de Dados</h2>
                </li>
                <li class="pb-2">
                    <p>Os dados pessoais devem ser armazenados apenas pelo tempo necessário para os fins para os quais
                        foram coletados e processados.</p>
                </li>
                <li class="pb-2">
                    <p>Após o período de retenção ou a pedido do titular dos dados, as imagens e informações associadas
                        devem ser excluídas de forma segura, garantindo que não possam ser recuperadas.</p>
                </li>
                <li class="pb-2">
                    <h2>Prevenção de Acesso Não Autorizado e Incidentes de Segurança</h2>
                </li>
                <li class="pb-2">
                    <p>Implementar firewalls, sistemas de detecção de intrusão (IDS), e sistemas de prevenção de
                        intrusão (IPS) para proteger contra acessos não autorizados e ataques cibernéticos.</p>
                </li>
                <li class="pb-2">
                    <p>Todos os incidentes de segurança devem ser documentados e investigados prontamente, com
                        notificações aos titulares dos dados e autoridades competentes, conforme exigido por lei.</p>
                </li>
                <li class="pb-2">
                    <h2>Treinamento e Conscientização de Usuários</h2>
                </li>
                <li class="pb-2">
                    <p>Todos os usuários e operadores da aplicação DIMPE devem receber treinamento regular sobre
                        práticas de segurança da informação, proteção de dados e privacidade.</p>
                </li>
                <li class="pb-2">
                    <p>Políticas de segurança devem ser revisadas e atualizadas periodicamente para garantir a
                        conformidade com as melhores práticas e requisitos legais.</p>
                </li>
            </ul>

        </Modal>
        <Modal label="Códico de etica" :show=showModalCode>
            <ul class="h-500px text-left list-none overflow-y-scroll">
                <li class="pb-2">
                    <h2>Proteção de Dados Pessoais</h2>
                </li>
                <li class="pb-2">
                    <p>Todos os dados pessoais capturados e processados pela aplicação DIMPE, incluindo imagens de
                        indivíduos, devem ser tratados conforme as leis de proteção de dados aplicáveis, como a Lei
                        Geral de Proteção de Dados (LGPD) no Brasil, o Regulamento Geral sobre a Proteção de Dados
                        (GDPR) na União Europeia, ou legislações equivalentes.</p>
                </li>
                <li class="pb-2">
                    <p>Apenas imagens nas quais pessoas foram identificadas serão armazenadas. Dados adicionais como a
                        quantidade de pessoas e suas localizações na imagem também serão registrados.</p>
                </li>
                <li class="pb-2">
                    <h2>Autorização e Consentimento</h2>
                </li>
                <li class="pb-2">
                    <p>A captura de imagens e a identificação de pessoas devem ser realizadas somente em locais e
                        situações em que haja consentimento prévio dos indivíduos ou que estejam de acordo com a
                        legislação aplicável.</p>
                </li>
                <li class="pb-2">
                    <p>Em casos onde o consentimento não é requerido por lei, a aplicação deve fornecer informações
                        claras sobre a coleta e processamento de dados.</p>
                </li>
                <li class="pb-2">
                    <h2>Controle de Acesso</h2>
                </li>
                <li class="pb-2">
                    <p>O acesso às imagens e informações armazenadas na aplicação DIMPE deve ser restrito a indivíduos
                        autorizados.</p>
                </li>
                <li class="pb-2">
                    <p>Implementar autenticação de múltiplos fatores (MFA) para todas as contas de usuários que acessam
                        a aplicação.</p>
                </li>
                <li class="pb-2">
                    <p>Registros de auditoria devem ser mantidos para monitorar o acesso aos dados e garantir que apenas
                        pessoas autorizadas possam visualizar ou manipular informações.</p>
                </li>
                <li class="pb-2">
                    <h2>Armazenamento Seguro</h2>
                </li>
                <li class="pb-2">
                    <p>As imagens e dados relacionados devem ser armazenados em servidores seguros, com mecanismos de
                        criptografia em repouso (at rest) para garantir a confidencialidade.</p>
                </li>
                <li class="pb-2">
                    <p>Os dados sensíveis devem ser encriptados usando padrões de criptografia robustos, como AES-256.
                    </p>
                </li>
                <li class="pb-2">
                    <p>Backups dos dados devem ser realizados regularmente e armazenados de forma segura para prevenir
                        perda de dados.</p>
                </li>

                <li class="pb-2">
                    <h2>Transmissão de Dados Segura</h2>
                </li>
                <li class="pb-2">
                    <p>Toda comunicação entre o drone, a aplicação e os servidores de armazenamento deve ser protegida
                        por criptografia em trânsito (in transit), utilizando protocolos como TLS (Transport Layer
                        Security).</p>
                </li>
                <li class="pb-2">
                    <h2>Retenção e Exclusão de Dados</h2>
                </li>
                <li class="pb-2">
                    <p>Os dados pessoais devem ser armazenados apenas pelo tempo necessário para os fins para os quais
                        foram coletados e processados.</p>
                </li>
                <li class="pb-2">
                    <p>Após o período de retenção ou a pedido do titular dos dados, as imagens e informações associadas
                        devem ser excluídas de forma segura, garantindo que não possam ser recuperadas.</p>
                </li>
                <li class="pb-2">
                    <h2>Prevenção de Acesso Não Autorizado e Incidentes de Segurança</h2>
                </li>
                <li class="pb-2">
                    <p>Implementar firewalls, sistemas de detecção de intrusão (IDS), e sistemas de prevenção de
                        intrusão (IPS) para proteger contra acessos não autorizados e ataques cibernéticos.</p>
                </li>
                <li class="pb-2">
                    <p>Todos os incidentes de segurança devem ser documentados e investigados prontamente, com
                        notificações aos titulares dos dados e autoridades competentes, conforme exigido por lei.</p>
                </li>
                <li class="pb-2">
                    <h2>Treinamento e Conscientização de Usuários</h2>
                </li>
                <li class="pb-2">
                    <p>Todos os usuários e operadores da aplicação DIMPE devem receber treinamento regular sobre
                        práticas de segurança da informação, proteção de dados e privacidade.</p>
                </li>
                <li class="pb-2">
                    <p>Políticas de segurança devem ser revisadas e atualizadas periodicamente para garantir a
                        conformidade com as melhores práticas e requisitos legais.</p>
                </li>
            </ul>

        </Modal>
    </div>
</template>
<style>
.rastro {

    transition: opacity 0.7s ease;

}

.rastro:hover {
    opacity: 0.5;
}
</style>