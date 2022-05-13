<template lang="html">
	<b-card>
		<b-card-text>
			<b-button
				variant="outline-primary"
				size="sm"
				@click="toggleEdit"
				style="margin-bottom: 0.5em"
				>Toggle</b-button
			>
			<div v-if="editing">
				<div class="row py-2">
					<div class="col-8">
						<div
							class="d-inline p-2 mt-2 mx-2 border"
							v-for="cssClass of row.CssClasses"
							:key="cssClass.UUID"
						>
							<span class="mx-2 text-dark">{{ cssClass.Name }}</span>
							<b-button
								class="close"
								aria-label="Close"
								size="sm"
								@click="deleteRowClass(cssClass.UUID)"
							>
								<span aria-hidden="true">&times;</span>
							</b-button>
						</div>
						<div v-if="!row.CssClasses.length">No CSS Classes</div>
					</div>
					<div class="col-2">
						<b-form-input
							v-model="className.Name"
							placeholder="Enter class name"
						></b-form-input>
					</div>
					<div class="col-2">
						<b-button
							variant="outline-primary"
							@click="addRowClass"
							:disabled="disabled.className"
							>Add Class</b-button
						>
					</div>
				</div>
				<div class="row">
					<div class="col-10">
						<b-form-textarea
							name="Content"
							v-model="column.Content"
							placeholder="Enter column content"
						></b-form-textarea>
					</div>
					<div class="col-2">
						<b-button
							variant="outline-primary"
							:disabled="disabled.column"
							@click="addColumn"
							>Add Column</b-button
						>
					</div>
				</div>
				<CardColumn
					v-for="column of row.Columns"
					:key="column.UUID"
					:column="column"
					@updateColumn="updateColumn"
					@deleteColumn="deleteColumn"
					@addColumnClass="addColumnClass"
					@deleteColumnClass="deleteColumnClass"
				/>
				<b-button
					variant="outline-danger"
					:disabled="disabled.delete"
					@click="deleteRow"
					>Delete Row</b-button
				>
			</div>
			<div v-if="!editing">
				<div class="row" v-if="row.Columns">
					<div
						class="col"
						v-for="column of row.Columns"
						:key="column.UUID"
						:column="column"
					>
						{{ column.Content }}
					</div>
				</div>
			</div>
		</b-card-text>
	</b-card>
</template>

<script>
import CardColumn from './CardColumn'
export default {
	components: {
		CardColumn,
	},
	props: ['row'],
	data: () => ({
		editing: false,
		column: {
			Content: '',
			Order: 0,
		},
		className: {
			Name: '',
			Order: 0,
		},
		disabled: {
			column: false,
			className: false,
			delete: false,
		},
	}),
	methods: {
		toggleEdit() {
			this.editing = !this.editing
		},
		addColumn() {
			const { Content, Order } = this.column
			const { UUID } = this.row
			this.$emit('addColumn', { UUID, Content, Order })
			this.disabled.column = true
			this.column.Content = ''
			setTimeout(() => {
				this.disabled.column = false
			}, 500)
		},
		updateColumn(event) {
			this.$emit('updateColumn', event)
		},
		deleteRow() {
			const { UUID } = this.row
			this.$emit('deleteRow', { UUID })
		},
		deleteColumn(event) {
			this.$emit('deleteColumn', event)
		},
		addRowClass() {
			const { Name, Order } = this.className
			const { UUID } = this.row
			this.$emit('addRowClass', { UUID, Name, Order })
			this.disabled.className = true
			this.className.Name = ''
			setTimeout(() => {
				this.disabled.className = false
			}, 500)
		},
		deleteRowClass(UUID) {
			this.$emit('deleteRowClass', { UUID })
		},
		addColumnClass(event) {
			this.$emit('addColumnClass', event)
		},
		deleteColumnClass(event) {
			this.$emit('deleteColumnClass', event);
		}
	},
	mounted() {
		if (this.row.Columns) {
			this.column.Order = this.row.Columns.length
		}
		if (this.row.CssClasses) {
			this.className.Order = this.row.CssClasses.length
		}
	},
}
</script>

<style lang="css" scoped>
.row,
.card,
.btn {
	margin-bottom: 0.5em;
}
</style>
