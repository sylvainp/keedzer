if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/Users/sylvain/.gradle/caches/transforms-3/565c567c8c887093c38a7d85d86080a2/transformed/jetified-hermes-android-0.71.10-debug/prefab/modules/libhermes/libs/android.arm64-v8a/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/sylvain/.gradle/caches/transforms-3/565c567c8c887093c38a7d85d86080a2/transformed/jetified-hermes-android-0.71.10-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

