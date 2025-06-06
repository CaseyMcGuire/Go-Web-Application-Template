// Code generated by ent, DO NOT EDIT.

package codegen

// CreateTodoInput represents a mutation input for creating todos.
type CreateTodoInput struct {
	Text     string
	Complete *bool
}

// Mutate applies the CreateTodoInput on the TodoMutation builder.
func (i *CreateTodoInput) Mutate(m *TodoMutation) {
	m.SetText(i.Text)
	if v := i.Complete; v != nil {
		m.SetComplete(*v)
	}
}

// SetInput applies the change-set in the CreateTodoInput on the TodoCreate builder.
func (c *TodoCreate) SetInput(i CreateTodoInput) *TodoCreate {
	i.Mutate(c.Mutation())
	return c
}
