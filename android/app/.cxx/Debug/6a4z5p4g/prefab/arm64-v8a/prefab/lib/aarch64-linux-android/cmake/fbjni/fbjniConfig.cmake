if(NOT TARGET fbjni::fbjni)
add_library(fbjni::fbjni SHARED IMPORTED)
set_target_properties(fbjni::fbjni PROPERTIES
    IMPORTED_LOCATION "/Users/sylvain/.gradle/caches/transforms-3/c9bd024e1950645d86b630b5a7b35a74/transformed/jetified-fbjni-0.3.0/prefab/modules/fbjni/libs/android.arm64-v8a/libfbjni.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/sylvain/.gradle/caches/transforms-3/c9bd024e1950645d86b630b5a7b35a74/transformed/jetified-fbjni-0.3.0/prefab/modules/fbjni/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

