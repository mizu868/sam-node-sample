## アーキテクチャ
DDD+クリーンアーキテクチャ構成

## アーキテクチャ構成要素
### controller
リクエストを受け取り解析し、usecase処理を呼び出す。

### usecase
各ユースケースの処理を実施する。外部との連携が必要な場合はrepositoryを呼び出す。

### repository
DBやexternalのAPI呼び出しなど外部呼び出しの処理を実施する。

### domain
各処理で使用するドメインを定義しておく場所。
