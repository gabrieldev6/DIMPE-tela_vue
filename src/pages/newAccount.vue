<script setup lang="ts">

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import logo from '../assets/logoDrone.svg'
import logo1 from '../assets/logoDimpe.svg'
import Modal from "../components/modal/modal.vue"
import { ref } from 'vue';
import api from '../service/api'
library.add(fas);

let nome = ref<string>('')
let email = ref<string>('')
let senha = ref<string>('')
let confirmacao = ref<string>('')
let senhaConfere = ref(false)
let campoNull = ref(false)
let tudoCerto = ref(false)

let showModalSecurity = ref<boolean>(false)
let showModalPrivacy = ref<boolean>(false)
const submit = () => {
    if (nome.value != '' && email.value != '' && senha.value != '' && confirmacao.value != '') {
        if (senha.value == confirmacao.value) {

            console.log(nome.value, email.value, senha.value, confirmacao.value)
            api.post("/usuario", {
                nome: nome.value,
                email: email.value,
                senha: senha.value

            }).then((response: any) => {
                if (response.status == 200) {
                    tudoCerto.value = true
                    senhaConfere.value = false
                    campoNull.value = false
                }
                console.log(response.status)
            })
        } else {
            senhaConfere.value = true
            campoNull.value = false
            tudoCerto.value = false
            console.log('senhas sao diferentes')
        }
    } else {
        campoNull.value = true
        senhaConfere.value = false
        tudoCerto.value = false
        console.log('algum campo ficou em branco')
    }
}

</script>

<template>
    <div class="flex justify-center items-center text-center bg-gray-100 w-full h-full">
        <div class="bg-white flex w-full h-full">

            <div class="w-full px-10 py-5  sm:w-30% dark:bg-gray-900 dark:color-gray">
                <div class="w-full h-90%">
                    <img :src="logo1" alt="logo" class="w-150px mt-8 2xl:w-250px">
                    <div class="w-full flex justify-start">
                        <h2 class="mt-12 font-normal">Cadastrar</h2>
                    </div>


                    <div class="bg-white w-full mt-3 rounded-1 shadow flex items-center text-center text-gray dark:bg-gray-800">
                        <FontAwesomeIcon icon="fa-solid fa-user" class="p-2"></FontAwesomeIcon>
                        <input v-model="nome" type="text" placeholder="Nome"
                            class="p-4 w-full rounded-1 text-4 font-bold dark:bg-gray-800">

                    </div>
                    <div class="bg-white w-full mt-3 rounded-1 shadow flex items-center text-center text-gray dark:bg-gray-800">
                        <FontAwesomeIcon icon="fa-solid fa-envelope" class="p-2"></FontAwesomeIcon>
                        <input v-model="email" type="Email" placeholder="Email"
                            class="p-4 w-full rounded-1 text-4 font-bold dark:bg-gray-800">

                    </div>
                    <div class="bg-white w-full mt-3 rounded-1 shadow flex items-center text-center text-gray dark:bg-gray-800">
                        <FontAwesomeIcon icon="fa-solid fa-lock" class="p-2"></FontAwesomeIcon>
                        <input v-model="senha" type="password" placeholder="Senha"
                            class="p-4 w-full rounded-1 text-4 font-bold dark:bg-gray-800">

                    </div>
                    <div class="bg-white w-full mt-3 rounded-1 shadow flex items-center text-center text-gray dark:bg-gray-800">
                        <FontAwesomeIcon icon="fa-solid fa-lock" class="p-2"></FontAwesomeIcon>
                        <input v-model="confirmacao" type="password" placeholder="Confirme a senha"
                            class="p-4 w-full rounded-1 text-4 font-bold dark:bg-gray-800">

                    </div>
                    <h5 v-if="senhaConfere" class="text-red mt-3">senhas são diferentes</h5>
                    <h5 v-if="campoNull" class="text-red mt-3">Um ou mais campos estao vazios</h5>
                    <h5 v-if="tudoCerto" class="text-black mt-3">Conta criada com sucesso</h5>
                    
                    <div class="flex w-full justify-start items-center pt-4 underline-0">
                        <input class="mx-4 w-6 h-6" type="checkbox">
                        <h4 class="font-normal">Eu li e concordo com o <button @click="showModalSecurity=!showModalSecurity" class="bg-white dark:bg-gray-900 color-blue-700 cursor-pointer font-bold"><h4>termos de serviço</h4> </button> e <button @click="showModalPrivacy=!showModalPrivacy" class="bg-white dark:bg-gray-900 color-blue-700 cursor-pointer font-bold" > <h4> politica de privacidade </h4></button> da companhia</h4>
                    
                    
                    </div>
                    <button @click="submit"
                        class=" shadow w-full mt-7 p-4 hover:bg-blue-500 text-white bg-blue rounded-1 ">
                        <h3>Cadastrar-se</h3>
                    </button>

                    <div class="flex mt-3 items-center">
                        <h4 class="font-normal">ja possui uma conta?</h4>
                        <router-link :to="{ name: 'login' }" class="ml-2 flex items-center no-underline hover:color-blue-800 text-blue-500 cursor-pointer font-bold">
                            <h3 class="font-bold ">Fazer login</h3>
                            <FontAwesomeIcon icon="fa-solid fa-arrow-right" class="p-2"></FontAwesomeIcon>
                        </router-link>
                        
                    </div>
                    
                </div>
                
                    
                    


            </div>
            <div class="w-70% shadow-xl shadow-gray-400 dark:shadow-black hidden sm:block">
                <!--  -->
                <div class="w-full h-95%  justify-around items-center bg-gray-700">
                    <div class="w-full h-25% flex justify-start ">
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
                    <div class="w-w-full h-50% flex justify-around items-center">
                        <img :src="logo" alt="imagem meramente ilustrativa" class="w-40 h-40">
                        <h1 class="color-white">Olá, seja bem vindo ao futuro!</h1>
                    </div>
                    <div class="w-full h-25% flex justify-end">
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
        </div>

        <Modal label="Segurança da informação" :show=showModalSecurity >
            <ul class="h-500px text-left list-none overflow-y-scroll">
                <li class="pb-2"><h2>Proteção de Dados Pessoais</h2></li>
                <li class="pb-2"><p>Todos os dados pessoais capturados e processados pela aplicação DIMPE, incluindo imagens de indivíduos, devem ser tratados conforme as leis de proteção de dados aplicáveis, como a Lei Geral de Proteção de Dados (LGPD) no Brasil, o Regulamento Geral sobre a Proteção de Dados (GDPR) na União Europeia, ou legislações equivalentes.</p></li>
                <li class="pb-2"><p>Apenas imagens nas quais pessoas foram identificadas serão armazenadas. Dados adicionais como a quantidade de pessoas e suas localizações na imagem também serão registrados.</p></li>
                <li class="pb-2"><h2>Autorização e Consentimento</h2></li>
                <li class="pb-2"><p>A captura de imagens e a identificação de pessoas devem ser realizadas somente em locais e situações em que haja consentimento prévio dos indivíduos ou que estejam de acordo com a legislação aplicável.</p></li>
                <li class="pb-2"><p>Em casos onde o consentimento não é requerido por lei, a aplicação deve fornecer informações claras sobre a coleta e processamento de dados.</p></li>
                <li class="pb-2"><h2>Controle de Acesso</h2></li>
                <li class="pb-2"><p>O acesso às imagens e informações armazenadas na aplicação DIMPE deve ser restrito a indivíduos autorizados.</p></li>
                <li class="pb-2"><p>Implementar autenticação de múltiplos fatores (MFA) para todas as contas de usuários que acessam a aplicação.</p></li>
                <li class="pb-2"><p>Registros de auditoria devem ser mantidos para monitorar o acesso aos dados e garantir que apenas pessoas autorizadas possam visualizar ou manipular informações.</p></li>
                <li class="pb-2"><h2>Armazenamento Seguro</h2></li>
                <li class="pb-2"><p>As imagens e dados relacionados devem ser armazenados em servidores seguros, com mecanismos de criptografia em repouso (at rest) para garantir a confidencialidade.</p></li>
                <li class="pb-2"><p>Os dados sensíveis devem ser encriptados usando padrões de criptografia robustos, como AES-256.</p></li>
                <li class="pb-2"><p>Backups dos dados devem ser realizados regularmente e armazenados de forma segura para prevenir perda de dados.</p></li>
                
                <li class="pb-2"><h2>Transmissão de Dados Segura</h2></li>
                <li class="pb-2"><p>Toda comunicação entre o drone, a aplicação e os servidores de armazenamento deve ser protegida por criptografia em trânsito (in transit), utilizando protocolos como TLS (Transport Layer Security).</p></li>
                <li class="pb-2"><h2>Retenção e Exclusão de Dados</h2></li>
                <li class="pb-2"><p>Os dados pessoais devem ser armazenados apenas pelo tempo necessário para os fins para os quais foram coletados e processados.</p></li>
                <li class="pb-2"><p>Após o período de retenção ou a pedido do titular dos dados, as imagens e informações associadas devem ser excluídas de forma segura, garantindo que não possam ser recuperadas.</p></li>
                <li class="pb-2"><h2>Prevenção de Acesso Não Autorizado e Incidentes de Segurança</h2></li>
                <li class="pb-2"><p>Implementar firewalls, sistemas de detecção de intrusão (IDS), e sistemas de prevenção de intrusão (IPS) para proteger contra acessos não autorizados e ataques cibernéticos.</p></li>
                <li class="pb-2"><p>Todos os incidentes de segurança devem ser documentados e investigados prontamente, com notificações aos titulares dos dados e autoridades competentes, conforme exigido por lei.</p></li>
                <li class="pb-2"><h2>Treinamento e Conscientização de Usuários</h2></li>
                <li class="pb-2"><p>Todos os usuários e operadores da aplicação DIMPE devem receber treinamento regular sobre práticas de segurança da informação, proteção de dados e privacidade.</p></li>
                <li class="pb-2"><p>Políticas de segurança devem ser revisadas e atualizadas periodicamente para garantir a conformidade com as melhores práticas e requisitos legais.</p></li>
            </ul>
            
        </Modal>
        <Modal label="Politica de privacidade" :show=showModalPrivacy >
            <ul class="h-500px text-left list-none overflow-y-scroll">
                <li class="pb-2"><h2>Proteção de Dados Pessoais</h2></li>
                <li class="pb-2"><p>Todos os dados pessoais capturados e processados pela aplicação DIMPE, incluindo imagens de indivíduos, devem ser tratados conforme as leis de proteção de dados aplicáveis, como a Lei Geral de Proteção de Dados (LGPD) no Brasil, o Regulamento Geral sobre a Proteção de Dados (GDPR) na União Europeia, ou legislações equivalentes.</p></li>
                <li class="pb-2"><p>Apenas imagens nas quais pessoas foram identificadas serão armazenadas. Dados adicionais como a quantidade de pessoas e suas localizações na imagem também serão registrados.</p></li>
                <li class="pb-2"><h2>Autorização e Consentimento</h2></li>
                <li class="pb-2"><p>A captura de imagens e a identificação de pessoas devem ser realizadas somente em locais e situações em que haja consentimento prévio dos indivíduos ou que estejam de acordo com a legislação aplicável.</p></li>
                <li class="pb-2"><p>Em casos onde o consentimento não é requerido por lei, a aplicação deve fornecer informações claras sobre a coleta e processamento de dados.</p></li>
                <li class="pb-2"><h2>Controle de Acesso</h2></li>
                <li class="pb-2"><p>O acesso às imagens e informações armazenadas na aplicação DIMPE deve ser restrito a indivíduos autorizados.</p></li>
                <li class="pb-2"><p>Implementar autenticação de múltiplos fatores (MFA) para todas as contas de usuários que acessam a aplicação.</p></li>
                <li class="pb-2"><p>Registros de auditoria devem ser mantidos para monitorar o acesso aos dados e garantir que apenas pessoas autorizadas possam visualizar ou manipular informações.</p></li>
                <li class="pb-2"><h2>Armazenamento Seguro</h2></li>
                <li class="pb-2"><p>As imagens e dados relacionados devem ser armazenados em servidores seguros, com mecanismos de criptografia em repouso (at rest) para garantir a confidencialidade.</p></li>
                <li class="pb-2"><p>Os dados sensíveis devem ser encriptados usando padrões de criptografia robustos, como AES-256.</p></li>
                <li class="pb-2"><p>Backups dos dados devem ser realizados regularmente e armazenados de forma segura para prevenir perda de dados.</p></li>
                
                <li class="pb-2"><h2>Transmissão de Dados Segura</h2></li>
                <li class="pb-2"><p>Toda comunicação entre o drone, a aplicação e os servidores de armazenamento deve ser protegida por criptografia em trânsito (in transit), utilizando protocolos como TLS (Transport Layer Security).</p></li>
                <li class="pb-2"><h2>Retenção e Exclusão de Dados</h2></li>
                <li class="pb-2"><p>Os dados pessoais devem ser armazenados apenas pelo tempo necessário para os fins para os quais foram coletados e processados.</p></li>
                <li class="pb-2"><p>Após o período de retenção ou a pedido do titular dos dados, as imagens e informações associadas devem ser excluídas de forma segura, garantindo que não possam ser recuperadas.</p></li>
                <li class="pb-2"><h2>Prevenção de Acesso Não Autorizado e Incidentes de Segurança</h2></li>
                <li class="pb-2"><p>Implementar firewalls, sistemas de detecção de intrusão (IDS), e sistemas de prevenção de intrusão (IPS) para proteger contra acessos não autorizados e ataques cibernéticos.</p></li>
                <li class="pb-2"><p>Todos os incidentes de segurança devem ser documentados e investigados prontamente, com notificações aos titulares dos dados e autoridades competentes, conforme exigido por lei.</p></li>
                <li class="pb-2"><h2>Treinamento e Conscientização de Usuários</h2></li>
                <li class="pb-2"><p>Todos os usuários e operadores da aplicação DIMPE devem receber treinamento regular sobre práticas de segurança da informação, proteção de dados e privacidade.</p></li>
                <li class="pb-2"><p>Políticas de segurança devem ser revisadas e atualizadas periodicamente para garantir a conformidade com as melhores práticas e requisitos legais.</p></li>
            </ul>
            
        </Modal>
    </div>
</template>