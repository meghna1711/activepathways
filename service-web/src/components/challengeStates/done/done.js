import {UserService} from "../../../services/user";

export default {
  name: 'Done',
  props: {
    challengeData: {
      default() {
        return {}
      }
    },
    isChallengeDetail: {default: false}
  },
  data() {
    return {
      notes: '',
      saveFlag: false
    }
  },
  created() {
    this.notes=this.challengeData['notes']
  },
  watch: {
    challengeData(){
      this.notes=this.challengeData['notes']
    }
  },
  computed: {
    notesStatus () {
      return this.challengeData['notes'] ? 'Update' : (saveFlag ? 'Save' : 'Add')
    }
  },
  methods: {
    changeStatus () {
      if(this.notesStatus==='Add')
      {
        this.saveFlag=true
      } else {
        console.log('151515','hit api')
        const challengeData={ ...this.challengeData}
        challengeData['notes']=this.notes
        UserService.updateUserChallengeById(challengeData).then((response)=>{
          this.$emit('challengeUpdated',response)
        })
      }
    }
  }
}
