
- 一个典型的Three.js程序至少要包括渲染器（Renderer）、场景（Scene）、照相机（Camera），以及你在场景中创建的物体。
- WebGL和Three.js使用的坐标系是右手坐标系。
- 照相机
  - 照相机是一个抽象，它定义了三维空间到二维屏幕的投影方式。
  - 正交投影照相机
    - THREE.OrthographicCamera(left, right, top, bottom, near, far)
  - 透视投影照相机
    - HREE.PerspectiveCamera(fov, aspect, near, far)
- 形状
  - 立方体
    - THREE.CubeGeometry(width, height, depth, widthSegments, heightSegments, depthSegments)
  - 平面
    - THREE.PlaneGeometry(width, height, widthSegments, heightSegments)
  - 球体
    - THREE.SphereGeometry(radius, segmentsWidth, segmentsHeight, phiStart, phiLength, thetaStart, thetaLength)
  - 圆形
    - THREE.CircleGeometry(radius, segments, thetaStart, thetaLength)
  - 圆柱体
    - THREE.CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded)
  - 正四面体、正八面体、正二十面体
    - THREE.TetrahedronGeometry(radius, detail)
    - THREE.OctahedronGeometry(radius, detail)
    - THREE.IcosahedronGeometry(radius, detail)
  - 圆环面
    - THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments, arc)
  - 圆环结
    - THREE.TorusKnotGeometry(radius, tube, radialSegments, tubularSegments, p, q, heightScale)
  - 文字形状 (需要下载和引用额外的字体库)
  ```javascript
    var loader = new THREE.FontLoader();
    loader.load('../lib/helvetiker_regular.typeface.json', function(font) {
        var mesh = new THREE.Mesh(new THREE.TextGeometry('Hello', {
            font: font,
            size: 1,
            height: 1
        }), material);
        scene.add(mesh);

        // render
        renderer.render(scene, camera);
    });
    THREE.TextGeometry(text, parameters)
    /* parameters:
      size：字号大小，一般为大写字母的高度
      height：文字的厚度
      curveSegments：弧线分段数，使得文字的曲线更加光滑
      font：字体，默认是'helvetiker'，需对应引用的字体文件
      weight：值为'normal'或'bold'，表示是否加粗
      style：值为'normal'或'italics'，表示是否斜体
      bevelEnabled：布尔值，是否使用倒角，意为在边缘处斜切
      bevelThickness：倒角厚度
      bevelSize：倒角宽度
    */
  ```
  - 自定义形状
    - THREE.Geometry()  // 它是其他如CubeGeometry、SphereGeometry等几何形状的父类
    ```javascript
      // 初始化几何形状
      var geometry = new THREE.Geometry();

      // 设置顶点位置
      // 顶部4顶点
      geometry.vertices.push(new THREE.Vector3(-1, 2, -1));
      geometry.vertices.push(new THREE.Vector3(1, 2, -1));
      geometry.vertices.push(new THREE.Vector3(1, 2, 1));
      geometry.vertices.push(new THREE.Vector3(-1, 2, 1));
      // 底部4顶点
      geometry.vertices.push(new THREE.Vector3(-2, 0, -2));
      geometry.vertices.push(new THREE.Vector3(2, 0, -2));
      geometry.vertices.push(new THREE.Vector3(2, 0, 2));
      geometry.vertices.push(new THREE.Vector3(-2, 0, 2));

      // 设置顶点连接情况
      // 顶面
      geometry.faces.push(new THREE.Face3(0, 1, 3));
      geometry.faces.push(new THREE.Face3(1, 2, 3));
      // 底面
      geometry.faces.push(new THREE.Face3(4, 5, 6));
      geometry.faces.push(new THREE.Face3(5, 6, 7));
      // 四个侧面
      geometry.faces.push(new THREE.Face3(1, 5, 6));
      geometry.faces.push(new THREE.Face3(6, 2, 1));
      geometry.faces.push(new THREE.Face3(2, 6, 7));
      geometry.faces.push(new THREE.Face3(7, 3, 2));
      geometry.faces.push(new THREE.Face3(3, 7, 0));
      geometry.faces.push(new THREE.Face3(7, 4, 0));
      geometry.faces.push(new THREE.Face3(0, 4, 5));
      geometry.faces.push(new THREE.Face3(0, 5, 1));
    ```


Cameras（照相机，控制投影方式）

    Camera
    OrthographicCamera
    PerspectiveCamera

Core（核心对象）

    BufferGeometry
    Clock（用来记录时间）
    EventDispatcher
    Face3
    Face4
    Geometry
    Object3D
    Projector
    Raycaster（计算鼠标拾取物体时很有用的对象）

Lights（光照）
    Light
    AmbientLight
    AreaLight
    DirectionalLight
    HemisphereLight
    PointLight
    SpotLight

Loaders（加载器，用来加载特定文件）
    Loader
    BinaryLoader
    GeometryLoader
    ImageLoader
    JSONLoader
    LoadingMonitor
    SceneLoader
    TextureLoader

Materials（材质，控制物体的颜色、纹理等）
    Material
    LineBasicMaterial
    LineDashedMaterial
    MeshBasicMaterial
    MeshDepthMaterial
    MeshFaceMaterial
    MeshLambertMaterial
    MeshNormalMaterial
    MeshPhongMaterial
    ParticleBasicMaterial
    ParticleCanvasMaterial
    ParticleDOMMaterial
    ShaderMaterial
    SpriteMaterial

Math（和数学相关的对象）

    Box2
    Box3
    Color
    Frustum
    Math
    Matrix3
    Matrix4
    Plane
    Quaternion
    Ray
    Sphere
    Spline
    Triangle
    Vector2
    Vector3
    Vector4

Objects（物体）

    Bone
    Line
    LOD
    Mesh（网格，最常用的物体）
    MorphAnimMesh
    Particle
    ParticleSystem
    Ribbon
    SkinnedMesh
    Sprite

Renderers（渲染器，可以渲染到不同对象上）

    CanvasRenderer
    WebGLRenderer（使用WebGL渲染，这是本书中最常用的方式）
    WebGLRenderTarget
    WebGLRenderTargetCube
    WebGLShaders（着色器，在最后一章作介绍）

Renderers / Renderables

    RenderableFace3
    RenderableFace4
    RenderableLine
    RenderableObject
    RenderableParticle
    RenderableVertex

Scenes（场景）

    Fog
    FogExp2
    Scene

Textures（纹理）

    CompressedTexture
    DataTexture
    Texture

Extras

    FontUtils
    GeometryUtils
    ImageUtils
    SceneUtils

Extras / Animation

    Animation
    AnimationHandler
    AnimationMorphTarget
    KeyFrameAnimation

Extras / Cameras

    CombinedCamera
    CubeCamera

Extras / Core

    Curve
    CurvePath
    Gyroscope
    Path
    Shape

Extras / Geometries（几何形状）

    CircleGeometry
    ConvexGeometry
    CubeGeometry
    CylinderGeometry
    ExtrudeGeometry
    IcosahedronGeometry
    LatheGeometry
    OctahedronGeometry
    ParametricGeometry
    PlaneGeometry
    PolyhedronGeometry
    ShapeGeometry
    SphereGeometry
    TetrahedronGeometry
    TextGeometry
    TorusGeometry
    TorusKnotGeometry
    TubeGeometry

Extras / Helpers

    ArrowHelper
    AxisHelper
    CameraHelper
    DirectionalLightHelper
    HemisphereLightHelper
    PointLightHelper
    SpotLightHelper

Extras / Objects

    ImmediateRenderObject
    LensFlare
    MorphBlendMesh

Extras / Renderers / Plugins

    DepthPassPlugin
    LensFlarePlugin
    ShadowMapPlugin
    SpritePlugin

Extras / Shaders

    ShaderFlares
    ShaderSprite
