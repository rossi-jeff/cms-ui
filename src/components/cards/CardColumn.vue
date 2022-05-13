<template>
	<b-card>
		<b-card-text>
			<div class="row py-2">
				<div class="col-8">
					<div
						class="d-inline p-2 mt-2 mx-2 border"
						v-for="cssClass of column.CssClasses"
						:key="cssClass.UUID"
					>
						<span class="mx-2 text-dark">{{ cssClass.Name }}</span>
						<b-button
							class="close"
							aria-label="Close"
							size="sm"
							@click="deleteColumnClass(cssClass.UUID)"
						>
							<span aria-hidden="true">&times;</span>
						</b-button>
					</div>
					<div v-if="!column.CssClasses.length">No CSS Classes</div>
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
						@click="addColumnClass"
						:disabled="disabled.className"
						>Add Class</b-button
					>
				</div>
			</div>
			<div class="row">
				<div class="col-10">
					<b-form-textarea
						name="Content"
						v-model="Content"
						placeholder="Enter column content"
					></b-form-textarea>
				</div>
				<div class="col-2">
					<b-button
						variant="outline-primary"
						:disabled="disabled.update"
						@click="updateColumn"
						>Update Column</b-button
					>
					<b-button
						variant="outline-danger"
						:disabled="disabled.delete"
						@click="deleteColumn"
						>Delete Column</b-button
					>
				</div>
			</div>
		</b-card-text>
	</b-card>
</template>

<script>
export default {
	props: ['column'],
	data: () => ({
		Content: '',
		disabled: {
			update: false,
			className: false,
			delete: false
		},
		className: {
			Name: '',
			Order: 0,
		},
	}),
	methods: {
		updateColumn() {
			const { Content } = this
			const { UUID } = this.column
			this.$emit('updateColumn', { UUID, Content })
			this.disabled = true
			setTimeout(() => {
				this.disabled = false
			}, 500)
		},
		deleteColumn() {
			const { UUID } = this.column
			this.$emit('deleteColumn', { UUID })
		},
		addColumnClass() {
			const { Name, Order } = this.className
			const { UUID } = this.column
			this.$emit('addColumnClass', { UUID, Name, Order })
			this.disabled.className = true
			this.className.Name = ''
			setTimeout(() => {
				this.disabled.className = false
			}, 500)
		},
		deleteColumnClass(UUID) {
			this.$emit('deleteColumnClass', { UUID })
		},
	},
	mounted() {
		this.Content = this.column.Content
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
