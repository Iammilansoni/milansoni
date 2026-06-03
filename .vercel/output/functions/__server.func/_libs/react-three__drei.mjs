import { r as reactExports } from "./react.mjs";
import { _ as _extends } from "./babel__runtime.mjs";
import { k as REVISION, l as PointsMaterial, D as DynamicDrawUsage, M as Matrix4, h as Vector3 } from "./three.mjs";
import { u as useFrame } from "./react-three__fiber.mjs";
const getVersion = () => parseInt(REVISION.replace(/\D+/g, ""));
const version = /* @__PURE__ */ getVersion();
const opaque_fragment = version >= 154 ? "opaque_fragment" : "output_fragment";
class PointMaterialImpl extends PointsMaterial {
  constructor(props) {
    super(props);
    this.onBeforeCompile = (shader, renderer) => {
      const {
        isWebGL2
      } = renderer.capabilities;
      shader.fragmentShader = shader.fragmentShader.replace(`#include <${opaque_fragment}>`, `
        ${!isWebGL2 ? `#extension GL_OES_standard_derivatives : enable
#include <${opaque_fragment}>` : `#include <${opaque_fragment}>`}
      vec2 cxy = 2.0 * gl_PointCoord - 1.0;
      float r = dot(cxy, cxy);
      float delta = fwidth(r);     
      float mask = 1.0 - smoothstep(1.0 - delta, 1.0 + delta, r);
      gl_FragColor = vec4(gl_FragColor.rgb, mask * gl_FragColor.a );
      #include <tonemapping_fragment>
      #include <${version >= 154 ? "colorspace_fragment" : "encodings_fragment"}>
      `);
    };
  }
}
const PointMaterial = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const [material] = reactExports.useState(() => new PointMaterialImpl(null));
  return /* @__PURE__ */ reactExports.createElement("primitive", _extends({}, props, {
    object: material,
    ref,
    attach: "material"
  }));
});
let i, positionRef;
const context = /* @__PURE__ */ reactExports.createContext(null);
const parentMatrix = /* @__PURE__ */ new Matrix4();
const position = /* @__PURE__ */ new Vector3();
const PointsInstances = /* @__PURE__ */ reactExports.forwardRef(({
  children,
  range,
  limit = 1e3,
  ...props
}, ref) => {
  const parentRef = reactExports.useRef(null);
  reactExports.useImperativeHandle(ref, () => parentRef.current, []);
  const [refs, setRefs] = reactExports.useState([]);
  const [[positions, colors, sizes]] = reactExports.useState(() => [new Float32Array(limit * 3), Float32Array.from({
    length: limit * 3
  }, () => 1), Float32Array.from({
    length: limit
  }, () => 1)]);
  reactExports.useEffect(() => {
    parentRef.current.geometry.attributes.position.needsUpdate = true;
  });
  useFrame(() => {
    parentRef.current.updateMatrix();
    parentRef.current.updateMatrixWorld();
    parentMatrix.copy(parentRef.current.matrixWorld).invert();
    parentRef.current.geometry.drawRange.count = Math.min(limit, range !== void 0 ? range : limit, refs.length);
    for (i = 0; i < refs.length; i++) {
      positionRef = refs[i].current;
      positionRef.getWorldPosition(position).applyMatrix4(parentMatrix);
      position.toArray(positions, i * 3);
      parentRef.current.geometry.attributes.position.needsUpdate = true;
      positionRef.matrixWorldNeedsUpdate = true;
      positionRef.color.toArray(colors, i * 3);
      parentRef.current.geometry.attributes.color.needsUpdate = true;
      sizes.set([positionRef.size], i);
      parentRef.current.geometry.attributes.size.needsUpdate = true;
    }
  });
  const api = reactExports.useMemo(() => ({
    getParent: () => parentRef,
    subscribe: (ref2) => {
      setRefs((refs2) => [...refs2, ref2]);
      return () => setRefs((refs2) => refs2.filter((item) => item.current !== ref2.current));
    }
  }), []);
  return /* @__PURE__ */ reactExports.createElement("points", _extends({
    userData: {
      instances: refs
    },
    matrixAutoUpdate: false,
    ref: parentRef,
    raycast: () => null
  }, props), /* @__PURE__ */ reactExports.createElement("bufferGeometry", null, /* @__PURE__ */ reactExports.createElement("bufferAttribute", {
    attach: "attributes-position",
    args: [positions, 3],
    usage: DynamicDrawUsage
  }), /* @__PURE__ */ reactExports.createElement("bufferAttribute", {
    attach: "attributes-color",
    args: [colors, 3],
    usage: DynamicDrawUsage
  }), /* @__PURE__ */ reactExports.createElement("bufferAttribute", {
    attach: "attributes-size",
    args: [sizes, 1],
    usage: DynamicDrawUsage
  })), /* @__PURE__ */ reactExports.createElement(context.Provider, {
    value: api
  }, children));
});
const PointsBuffer = /* @__PURE__ */ reactExports.forwardRef(({
  children,
  positions,
  colors,
  sizes,
  stride = 3,
  ...props
}, forwardedRef) => {
  const pointsRef = reactExports.useRef(null);
  reactExports.useImperativeHandle(forwardedRef, () => pointsRef.current, []);
  useFrame(() => {
    const attr = pointsRef.current.geometry.attributes;
    attr.position.needsUpdate = true;
    if (colors) attr.color.needsUpdate = true;
    if (sizes) attr.size.needsUpdate = true;
  });
  return /* @__PURE__ */ reactExports.createElement("points", _extends({
    ref: pointsRef
  }, props), /* @__PURE__ */ reactExports.createElement("bufferGeometry", null, /* @__PURE__ */ reactExports.createElement("bufferAttribute", {
    attach: "attributes-position",
    args: [positions, stride],
    usage: DynamicDrawUsage
  }), colors && /* @__PURE__ */ reactExports.createElement("bufferAttribute", {
    attach: "attributes-color",
    args: [colors, stride],
    count: colors.length / stride,
    usage: DynamicDrawUsage
  }), sizes && /* @__PURE__ */ reactExports.createElement("bufferAttribute", {
    attach: "attributes-size",
    args: [sizes, 1],
    count: sizes.length / stride,
    usage: DynamicDrawUsage
  })), children);
});
const Points = /* @__PURE__ */ reactExports.forwardRef((props, forwardedRef) => {
  if (props.positions instanceof Float32Array) {
    return /* @__PURE__ */ reactExports.createElement(PointsBuffer, _extends({}, props, {
      ref: forwardedRef
    }));
  } else return /* @__PURE__ */ reactExports.createElement(PointsInstances, _extends({}, props, {
    ref: forwardedRef
  }));
});
export {
  Points as P,
  PointMaterial as a
};
