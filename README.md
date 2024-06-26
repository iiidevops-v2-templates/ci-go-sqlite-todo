# Todo List Application
這是一個使用 Go 語言開發的簡單 Todo List 網頁應用，包含顯示、添加和刪除 Todo 項目功能，並使用 SQLite 作為後端資料庫。此專案已配置 Docker 支援，方便開發和部署。

## 專案結構
```
├── Dockerfile
├── README.md
├── app
│   ├── main.go
│   ├── static
│   │   ├── go.png
│   │   ├── script.js
│   │   └── style.css
│   └── templates
│       └── index.html
├── go.mod
├── go.sum
└── iiidevops
    ├── app.blacklist
    ├── app.env
    ├── app.env.develop
    ├── iiidevops-templates.yml
    ├── jobs
    │   └── sample.yml
    ├── pipeline_settings.json
    ├── postman
    │   ├── postman_collection.json
    │   └── postman_environment.json
    ├── sideex
    │   ├── Global Variables.json
    │   └── sideex.json
    └── sonarqube
        └── SonarScan

```
## 如何使用
### 前置準備
若要上傳自己的 Go 程式，請將其放置於 app 目錄下，並刪除原範本檔案，同時請依實際專案配置更改 Dockerfile。

若有環境變數需求，請在 iiidevops 目錄下的 app.env 內，以 key-value 的方式存入需要的系統環境變數。您可在 container 裡下 env 即可看到該變數是否已設置至 container 內。 app.env 也支援分支，若特定分支需要的環境變數，則可在 app.env 後面再加上 .分支名，以 dev 分支為例，該名稱將為 app.env.dev。

### Directory Details
  * Dockerfile: Docker configuration file to build the Go application.
  * README.md: Project documentation.
  * app/: Directory containing the Go application.
    * main.go: Main Go application file.
    * static/: Directory containing static files.
      * go.png: Local image file used as an icon in the application.
      * script.js: JavaScript file for client-side functionality.
      * style.css: CSS file for styling the web application.
    * static/: Directory containing static files.
      * go.png: Local image file used as an icon in the application.
  * go.mod: Go module file.
  * go.sum: Go dependencies file.
  * iiidevops/: Directory containing configuration files for CI/CD and environment management.
      * app.blacklist: SAST Blacklist configuration.
      * app.env: Environment variables configuration.
      * app.env.develop: Environment variables configuration for the develop branch.
      * jobs/sample.yml: Sample job configuration.
      * postman/: Directory containing Postman collections and environments for API testing.
        * postman_collection.json: Postman collection file.
        * postman_environment.json: Postman environment file.
      * sideex/: Directory containing SideeX test configurations.
        * Global Variables.json: Global variables for SideeX tests.
        * sideex.json: SideeX test configuration.
      * sonarqube/SonarScan: Configuration for SonarQube scanning.

### To build and run the docker locally
```
docker build -t todo-list-app .
docker run -p 8080:8080 todo-list-app
```
