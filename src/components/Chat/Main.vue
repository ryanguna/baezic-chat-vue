<template>
    <div >

      <v-navigation-drawer
        fixed
        app
        :width = "220"
      >
        <v-list dense>
          <v-subheader>Online Users</v-subheader>
          <v-divider/>

          <v-list-tile avatar v-for="(user, index) in onlineUsers" v-if="onlineUsers.length > 0" :key="index" @click="">
            <v-list-tile-avatar>
              <img src="https://vuetifyjs.com/static/doc-images/lists/1.jpg">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{user.nickname}}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon color="teal">chat_bubble</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>


      <v-toolbar dense color="indigo" dark fixed app>
        <v-toolbar-title>Baezic Chat v0.1 Alpha</v-toolbar-title>
      </v-toolbar>

      <v-content >
        <v-container fluid>


          <v-list >
            <template v-for = "(message,index) in messages">
              <!--<v-subheader>{{ message.nickname }}</v-subheader>-->

              <v-list-tile avatar v-if="message.action" text-xs-right>
                <v-list-tile-content>
                  <v-list-tile-title> {{ message.message }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-list-tile avatar v-else >
                <v-list-tile-avatar>
                  <img src="https://randomuser.me/api/portraits/men/35.jpg">
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title> {{ message.nickname }}</v-list-tile-title>
                  <v-list-tile-sub-title>{{message.message}}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>

            </template>
          </v-list>


           <!--<v-layout row v-for = "(message,index) in messages" :key = "index">-->

             <!--<v-flex xs12   v-bind = "{ [`text-xs-${currentUser.connection_id == message.connection_id ? 'right' : 'left'}`]: true }">-->
               <!--<v-avatar>-->
                 <!--<img src="https://randomuser.me/api/portraits/men/35.jpg" alt="trevor">-->
               <!--</v-avatar>-->
               <!--<v-chip >{{message.message}}</v-chip>-->

             <!--</v-flex>-->

           <!--</v-layout>-->



        </v-container>
      </v-content>

      <v-footer color="indigo" inset app>

          <v-text-field solo  label="First Name" v-model="messagebox"></v-text-field>
          <v-btn large @click="sendMessage()">SEND</v-btn>


      </v-footer>




      <v-dialog v-model="dialog" persistent max-width="330">
        <v-card>
          <v-card-title class="headline">What should we call you?</v-card-title>

          <v-container grid-list-lg>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Nickname" v-model="nickname" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              color="green darken-1"
              depressed
              :loading="loading"
              :disabled="loading"
              @click.native="setUsername()"
            >
              Proceed
            </v-btn>

          </v-card-actions>
        </v-card>
      </v-dialog>



    </div>
</template>

<script>
    export default {
        name: "chat",
        data() {
          return {
            loader: null,
            loading: false,
            drawer: null,
            nickname : '',
            messagebox : '',
            dialog: true
          }
        },
        methods : {
          sendMessage(){
            const _self = this;
            _self.$socket.emit('sendUserMessage', _self.messagebox,
              (response)=>{
              if(response){
                _self.messagebox = '';
              }
            });
          },
          setUsername(){
            const _self = this;

            _self.loading = true;
            _self.$socket.emit('setUsername', {
              nickname : _self.nickname,
            },(response) => {
              if(response){
                _self.nickname = '';
                _self.dialog = false;
                _self.$socket.emit('loadAllMessages');
              }
              _self.loading = false;
            });


          }
        },
        computed : {
          onlineUsers(){
            return this.$store.state.users;
          },
          messages(){
            return this.$store.state.messages;
          },
          currentUser(){
            return this.$store.state.current_user;
          }
        }
    }
</script>

<style scoped>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
