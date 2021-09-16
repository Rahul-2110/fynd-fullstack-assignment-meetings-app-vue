<template>
  <div>
      <ClockSpinner
            v-if="status === 'LOADING'"
            size="large"
            theme="primary"
        />
  </div>
</template>

<script>
import { getMeetingsOnADate } from '@/services/calendarServices.js';

export default {
    name:'Calendar',
    data() {
			return {
                status: 'LOADING',
				meetings: [],
                error: null
			};
		},
    methods :{
        getMeetings(){
            console.log(this.meetings);
        }
    },
    async created() {
        try {
            const data = await getMeetingsOnADate((new Date()).toISOString().split('T')[0]);
            console.log( data );
        } catch( error ) {
            this.error = error;
        }
    }
}
</script>

<style scoped>
    div{
        margin-top: 200px;
    }
</style>
    
