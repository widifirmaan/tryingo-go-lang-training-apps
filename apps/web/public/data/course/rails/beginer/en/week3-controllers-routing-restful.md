# Action Controller: Strong Parameters, Flash Alerts & RESTful Workflows

> **Kategori:** Ruby on Rails 8 | **Level:** Beginner | **Minggu 3:** Action Controller: Strong Parameters, Flash Alerts & RESTful Workflows

## Learning Objectives

- Master the 7 canonical RESTful Rails controller actions: `index`, `show`, `new`, `create`, `edit`, `update`, `destroy`.
- Shield actions against Mass Assignment exploits via **Strong Parameters** (`require` and `permit`).
- Deploy `before_action` lifecycle filters enforcing DRY (Don't Repeat Yourself) design.
- Understand semantic HTTP status codes (`:unprocessable_entity`, `:see_other`) mandatory for Hotwire Turbo integration.

---

## Program: RESTful Task Controller with Strong Parameters Security Defense

```ruby
# app/controllers/tasks_controller.rb
class TasksController < ApplicationController
  before_action :set_project, only: [:create]
  before_action :set_task, only: [:update, :destroy]

  # POST /projects/:project_id/tasks
  def create
    @task = @project.tasks.build(task_params)

    if @task.save
      redirect_to @project, notice: "Tugas '#{@task.title}' berhasil ditambahkan ke papan proyek!"
    else
      # Kembalikan HTTP 422 Unprocessable Entity untuk kompatibilitas Hotwire Turbo
      render "projects/show", status: :unprocessable_entity
    end
  end

  # PATCH/PUT /tasks/:id
  def update
    if @task.update(task_params)
      redirect_to @task.project, notice: "Status tugas berhasil diperbarui."
    else
      render :edit, status: :unprocessable_entity
    end
  end

  # DELETE /tasks/:id
  def destroy
    project = @task.project
    @task.destroy
    redirect_to project, notice: "Tugas berhasil dihapus.", status: :see_other
  end

  private

  def set_project
    @project = Project.find(params[:project_id])
  end

  def set_task
    @task = Task.find(params[:id])
  end

  # Strong Parameters: Whitelist atribut untuk mematikan celah Mass Assignment Attack
  def task_params
    params.require(:task).permit(:title, :status, :priority, :due_date, :assignee_id)
  end
end

puts "=== ACTION CONTROLLER WITH STRONG PARAMETERS INITIALIZED ==="
```

---

## Key Concepts

In early web frameworks, models ingested raw parameters via `User.create(params[:user])`. This exposed catastrophic **Mass Assignment** exploits: malicious actors injected `admin=true` into registration payloads, escalating privileges to Super Admin.

### Absolute Defense: Strong Parameters
Rails Action Controller enforces **Strong Parameters**:
`params.require(:task).permit(:title, :status, :priority)`
Only attributes explicitly whitelisted within `.permit()` pass to model layers; foreign parameters are discarded automatically.

### Semantic HTTP Status Codes for Hotwire Turbo
When form submissions fail validation, controllers must yield `status: :unprocessable_entity` (HTTP 422). Returning HTTP 200 confuses Hotwire Turbo, preventing error banners from rendering. Similarly, deletion redirects require `status: :see_other` (HTTP 303) ensuring smooth frame navigation.


---

---

## Beginner Friendly Explanation

Imagine ordering takeout via a delivery app. Strong Parameters act like a checkout clerk auditing order slips: if a patron sneakily scribbled "Include Free Gold Bar" at the bottom, the clerk crosses out the unauthorized addition, packing only authorized food items into the delivery bag.

## Experiments

- Submit a POST payload with an unpermitted `is_admin: true` parameter verifying it is stripped by Strong Parameters.
- Omit `status: :unprocessable_entity` during validation failures and observe Hotwire failing to update the DOM.
- Deploy `flash.now[:alert]` for ephemeral error messages rendered during the active request.

---

## Challenge

Author nested strong parameters permitting task instantiation alongside multiple uploaded document attachments via Active Storage (`permit(:title, documents: [])`).

---

## Summary

You have mastered Action Controller, Strong Parameters, and HTTP Status Codes for Turbo. Next week we explore Hotwire Turbo Drive and Turbo Frames.
