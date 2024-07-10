<template>
    <div class="medicineDetails" style="width: 100%; padding: 0; height: 100%;">
        <ul class="tabs">
            <li style="margin-left: 0!important;" title="Relates to allergies, medical conditions and notes added by pharmacists."
            :class="{'active': activeTab == 'notes'}" @click="activeTab = 'notes'">
                <a class="danger" href="javascript:;">Patient Notes 
                    <span v-if="(notes.critical.length) > 0" class="badge red">{{ notes.critical.length}}</span>
                </a>
            </li>                             
            <li title="Relates communication with perscriber and notes sent with perscription" 
            :class="{'active': activeTab == 'patient'}" @click="activeTab = 'patient'">
                <a href="javascript:;">Queried Notes 
                    <span v-if="(notes.correspondence.length + notes.information.length) > 0" class="badge red">{{ notes.correspondence.length  + notes.information.length }}</span>
                </a>
            </li>
            <li title="Relates to the current order" 
            :class="{'active': activeTab == 'order'}" @click="activeTab = 'order'">
                <a href="javascript:;">Order Notes 
                    <span v-if="(notes.other.length || (prescription.Notes != '' && prescription.Notes != null)) > 0" class="badge red">
                        {{ notes.other.length + ((prescription.Notes != '' && prescription.Notes != null) ? 1 : 0) }}
                    </span>
                </a>
            </li>
            <li v-if="!locked" style="margin-right: 0!important;" title="Add new note" @click="openNote()">
                <a href="javascript:;"><i class="fa fa-plus"></i></a>
            </li>
        </ul>

        <div class="content" v-if="activeTab == 'notes'">
            <ul v-if="notes.critical.length > 0" class="critical">
                <li class="note" :class="[note.DeletedAt != null || note.EditedAt != null ? 'deleted' : '']" v-for="note in notes.critical" :key="note.NoteID">
                    <div class="note-body" v-html="note.Note"/>
                    <div class="note-footer">
                        <span>{{note.name}} {{note.surname}}</span><span>{{note.CreatedAt}}</span>
                    </div>
                    <div class="note-footer" style="color:red;" v-if="note.DeletedAt != null">
                        <span>Deleted By {{note.DeletedName}} {{note.DeletedSurname}}</span><span>{{note.DeletedAt}}</span>
                    </div>
                    <div class="note-footer" style="color:#ff8944;" v-if="note.EditedAt != null">
                        <span>Edited By {{note.EditedName}} {{note.EditedSurname}}</span><span>{{note.EditedAt}}</span>
                    </div>                                    
                    <div class="note-footer" v-if="userInfo.role >= 20 && note.DeletedAt == null && note.EditedAt == null">
                        <div>
                            <b class="clickable" @click="showEditHistory(note.NoteID)" v-if="note.Edits.length > 0 && userInfo.role >= 50" style="color:#ff8944;">
                                <span v-if="showEditHistoryFor.includes(note.NoteID)">Hide Edit History</span>
                                <span v-else>Show Edit History</span>
                            </b> 
                        </div>     
                        <div>
                            <button v-if="userInfo.role >= 50 || note.UserID == userInfo.id" @click="deleteNote(note.NoteID)" class="smallTextBtn secondaryBtn" style="font-size: 12px; cursor:pointer;">Delete</button>
                            <button v-if="note.UserID == userInfo.id" @click="openNote(note)" class="smallTextBtn secondaryBtn" style="font-size: 12px; cursor:pointer;">Edit</button>
                        </div>                                    
                    </div>
                    <div class="note-footer" v-else-if="userInfo.role >= 50 && (note.DeletedAt != null)">
                        <b class="clickable" @click="showEditHistory(note.NoteID)" v-if="note.Edits.length > 0 && userInfo.role >= 50" style="color:#ff8944;">
                            <span v-if="showEditHistoryFor.includes(note.NoteID)">Hide Edit History</span>
                            <span v-else>Show Edit History</span>
                        </b> 
                    </div>

                    <div v-if="showEditHistoryFor.includes(note.NoteID)" class="note-footer">
                        
                        <ul class="critical" style="width: 100%;">
                            <li class="note" v-for="edited in note.Edits" :key="edited.NoteID">
                                <div class="note-body" v-html="edited.Note"/>
                                <div class="note-footer">
                                    <span>{{edited.name}} {{edited.surname}}</span><span>{{edited.CreatedAt}}</span>
                                </div>
                                <div class="note-footer" style="color:#ff8944;">
                                    <span>Edited By {{edited.EditedName}} {{edited.EditedSurname}}</span><span>{{edited.EditedAt}}</span>
                                </div>                                    
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>

            <ul v-else>
                <li>No patient notes found</li>
            </ul>
        </div>

        <div class="content" v-if="activeTab == 'patient'">
            <ul v-if="notes.information.length > 0" class="medical">
                <li class="note" :class="[note.DeletedAt != null || note.EditedAt != null ? 'deleted' : '']" v-for="note in notes.information" :key="note.NoteID">
                    <div class="note-body" v-html="note.Note"/>
                    <div class="note-footer">
                        <span>{{note.name}} {{note.surname}}</span><span>{{note.CreatedAt}}</span>
                    </div>
                    <div class="note-footer" style="color:red;" v-if="note.DeletedAt != null">
                        <span>Deleted By {{note.DeletedName}} {{note.DeletedSurname}}</span><span>{{note.DeletedAt}}</span>
                    </div>    
                    <div class="note-footer" style="color:#ff8944;" v-if="note.EditedAt != null">
                        <span>Edited By {{note.EditedName}} {{note.EditedSurname}}</span><span>{{note.EditedAt}}</span>
                    </div>
                    <div class="note-footer" v-if="userInfo.role >= 20 && note.DeletedAt == null && note.EditedAt == null">
                        <div>
                            <b class="clickable" @click="showEditHistory(note.NoteID)" v-if="note.Edits.length > 0 && userInfo.role >= 50" style="color:#ff8944;">
                                <span v-if="showEditHistoryFor.includes(note.NoteID)">Hide Edit History</span>
                                <span v-else>Show Edit History</span>
                            </b> 
                        </div>    
                        <div>
                            <button v-if="userInfo.role >= 50 || note.UserID == userInfo.id" @click="deleteNote(note.NoteID)" class="smallTextBtn secondaryBtn" style="font-size: 12px; cursor:pointer;">Delete</button>
                            <button v-if="note.UserID == userInfo.id" @click="openNote(note)" class="smallTextBtn secondaryBtn" style="font-size: 12px; cursor:pointer;">Edit</button>
                        </div>
                    </div>
                    <div class="note-footer" v-else-if="userInfo.role >= 50 && (note.DeletedAt != null)">
                        <b class="clickable" @click="showEditHistory(note.NoteID)" v-if="note.Edits.length > 0 && userInfo.role >= 50" style="color:#ff8944;">
                            <span v-if="showEditHistoryFor.includes(note.NoteID)">Hide Edit History</span>
                            <span v-else>Show Edit History</span>
                        </b> 
                    </div>

                    <div v-if="showEditHistoryFor.includes(note.NoteID)" class="note-footer">
                        <ul class="medical" style="width: 100%;">
                            <li class="note" v-for="edited in note.Edits" :key="edited.NoteID">
                                <div class="note-body" v-html="edited.Note"/>
                                <div class="note-footer">
                                    <span>{{edited.name}} {{edited.surname}}</span><span>{{edited.CreatedAt}}</span>
                                </div>
                                <div class="note-footer" style="color:#ff8944;">
                                    <span>Edited By {{edited.EditedName}} {{edited.EditedSurname}}</span><span>{{edited.EditedAt}}</span>
                                </div>                                    
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
            
            <ul v-if="notes.correspondence.length > 0" class="other">
                <li class="note" v-for="note in notes.correspondence" :key="note.NoteID">
                    <div class="note-header" v-html="note.Subject"/>
                    <hr>
                    <div class="note-body" v-html="note.Message"/>
                    <hr>
                    <div class="note-footer">
                        <span>{{note.Name}} {{note.Surname}}</span><span>{{ note.Date }} </span>
                    </div>
                </li>
            </ul>

            <ul v-if="notes.correspondence.length == 0 && notes.information.length == 0">
                <li>No queried notes found</li>
            </ul>
        </div>      

        <div class="content" v-if="activeTab == 'order'">
            <ul v-if="prescription.Notes != '' && prescription.Notes != null" class="other">
                <li class="note">
                    <div class="note-body" v-html="prescription.Notes"/>
                    <div class="note-footer">
                        <!-- <span>{{note.name}} {{note.surname}}</span><span>{{note.CreatedAt}}</span> -->
                    </div>
                </li>
            </ul>

            <ul v-if="notes.other.length > 0" class="other">
                <li class="note" :class="[note.DeletedAt != null || note.EditedAt != null ? 'deleted' : '']" v-for="note in notes.other" :key="note.NoteID">
                    <div class="note-body" v-html="note.Note"/>
                    <div class="note-footer">
                        <span>{{note.name}} {{note.surname}}</span><span>{{note.CreatedAt}}</span>
                    </div>
                    <div class="note-footer" style="color:red;" v-if="note.DeletedAt != null">
                        <span>Deleted By {{note.DeletedName}} {{note.DeletedSurname}}</span><span>{{note.DeletedAt}}</span>
                    </div>
                    <div class="note-footer" style="color:#ff8944;" v-if="note.EditedAt != null">
                        <span>Edited By {{note.EditedName}} {{note.EditedSurname}}</span><span>{{note.EditedAt}}</span>
                    </div>
                    <div class="note-footer" v-if="userInfo.role >= 20 && note.DeletedAt == null && note.EditedAt == null">
                        <div>
                            <b class="clickable" @click="showEditHistory(note.NoteID)" v-if="note.Edits.length > 0 && userInfo.role >= 50" style="color:#ff8944;">
                                <span v-if="showEditHistoryFor.includes(note.NoteID)">Hide Edit History</span>
                                <span v-else>Show Edit History</span>
                            </b> 
                        </div>
                        <div>
                            <button v-if="userInfo.role >= 50 || note.UserID == userInfo.id" @click="deleteNote(note.NoteID)" class="smallTextBtn secondaryBtn" style="font-size: 12px; cursor:pointer;">Delete</button>
                            <button v-if="note.UserID == userInfo.id" @click="openNote(note)" class="smallTextBtn secondaryBtn" style="font-size: 12px; cursor:pointer;">Edit</button>
                        </div>
                    </div>
                    <div class="note-footer" v-else-if="userInfo.role >= 50 && (note.DeletedAt != null)">
                        <b class="clickable" @click="showEditHistory(note.NoteID)" v-if="note.Edits.length > 0 && userInfo.role >= 50" style="color:#ff8944;">
                            <span v-if="showEditHistoryFor.includes(note.NoteID)">Hide Edit History</span>
                            <span v-else>Show Edit History</span>
                        </b> 
                    </div>

                    <div v-if="showEditHistoryFor.includes(note.NoteID)" class="note-footer">
                        <ul class="other" style="width: 100%;">
                            <li class="note" v-for="edited in note.Edits" :key="edited.NoteID">
                                <div class="note-body" v-html="edited.Note"/>
                                <div class="note-footer">
                                    <span>{{edited.name}} {{edited.surname}}</span><span>{{edited.CreatedAt}}</span>
                                </div>
                                <div class="note-footer" style="color:#ff8944;">
                                    <span>Edited By {{edited.EditedName}} {{edited.EditedSurname}}</span><span>{{edited.EditedAt}}</span>
                                </div>                                    
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>

            <ul v-if="(prescription.Notes == '' || prescription.Notes == null) && notes.other.length == 0">
                <li>No order notes found</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "NotesPopup",
    props: {
        notes: {
            type: Object,
            default: {critical:[], information:[], other: [], correspondence: [], alerts: []}
        },
        prescription: {
            type: Object,
            default: {Notes: ''}
        },
        locked: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            userInfo: userInfo,
            activeTab: userInfo.role == 30 ? 'notes' : 'order',
            showEditHistoryFor: [],
        }
    },
    methods: {
        deleteNote(id){
            this.$swal({
                title: 'Delete Note',
                html: 'Are you sure you want to delete this note?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#ff5151',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes!'
            }).then((result) => {
                if (result.value) {
                    axios.post('/note/'+id+'/delete')
                    .then((response) => {
                        this.postSuccess(response.data.message);
                    })
                    .catch((error) => {
                        this.postError(error.response.data.message);
                    })
                    .finally(() => {
                        this.$root.$emit('prescriptionpool.getnotes');
                    })
                }
            })
        },
        openNote(note = false){
            this.$root.$emit('modal.close', 'quicktraynotes');
            this.$root.$emit('modal.open', 'note', note);
        },
        showEditHistory(id){
            if(!this.showEditHistoryFor.includes(id)){
                this.showEditHistoryFor.push(id);
            } else {
                this.showEditHistoryFor.splice(this.showEditHistoryFor.indexOf(id), 1);                    
            }
        },
    }
}
</script>